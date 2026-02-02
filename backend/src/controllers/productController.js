const ProductModel = require("../DB/models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../services/apiFeatures");
const {
  cloudUpload,
  cloudDelete,
  cloudDeleteMultiple,
} = require("../services/imageUpload");
const ErrorHandler = require("../services/errorHandler");

module.exports = {
  /**
   * Create a new product with images
   * @route POST /api/products
   * @access Private/Admin
   */
  createProduct: catchAsyncErrors(async (req, res, next) => {
    const images = req.files;

    // Validate images
    if (!images || images.length === 0) {
      return next(
        new ErrorHandler("Please upload at least one product image", 400),
      );
    }

    let productImages = [];
    images.forEach((image) => {
      productImages.push(image.path);
    });

    const folder = "cakeemon/products";
    const imgLinks = [];

    try {
      // Upload images to cloud
      for (let i = 0; i < productImages.length; i++) {
        const result = await cloudUpload(productImages[i], folder);
        imgLinks.push({
          public_id: result.public_id,
          img: result.url,
        });
      }

      req.body.images = imgLinks;
      // req.body.createdBy = req.user._id;

      // Create product using modern async/await
      const product = await ProductModel.create(req.body);

      res.status(201).json({
        success: true,
        message: "Product added successfully!",
        product,
      });
    } catch (error) {
      // Cleanup uploaded images if product creation fails
      for (let i = 0; i < imgLinks.length; i++) {
        await cloudDelete(imgLinks[i].public_id);
      }
      return next(
        new ErrorHandler(error.message || "Failed to create product", 500),
      );
    }
  }),

  /**
   * Get all products with pagination and filters
   * @route GET /api/products
   * @access Public
   */
  getAllProducts: catchAsyncErrors(async (req, res, next) => {
    const productPerPage = 10;
    const productsCount = await ProductModel.countDocuments();

    const apiFeature = new ApiFeatures(ProductModel.find({}), req.query)
      .search()
      .filter();

    apiFeature.pagination(productPerPage);

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;

    // Don't wrap response in next() - just send it
    res.status(200).json({
      success: true,
      products,
      filteredProductsCount,
      productsCount,
      productPerPage,
    });
  }),

  /**
   * Get all products for admin (no pagination)
   * @route GET /api/admin/products
   * @access Private/Admin
   */
  getAdminProducts: catchAsyncErrors(async (req, res, next) => {
    const products = await ProductModel.find();

    if (!products || products.length === 0) {
      return next(new ErrorHandler("No products found", 404));
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  }),

  /**
   * Get single product details
   * @route GET /api/products/:id
   * @access Public
   */
  getProductDetails: catchAsyncErrors(async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  }),

  /**
   * Update product details and images
   * @route PUT /api/products/:id
   * @access Private/Admin
   */
  updateProduct: catchAsyncErrors(async (req, res, next) => {
    let product = await ProductModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let productImages = [];
    if (req.files && req.files.length > 0) {
      productImages = req.files.map((file) => file.path);
    }

    const folder = "cakeemon/products";
    const imgLinks = [];

    // Only update images if new ones are provided
    if (productImages.length > 0) {
      try {
        // Delete old images from cloud
        await cloudDeleteMultiple(product.images.map((img) => img.public_id));

        // Upload new images
        for (let i = 0; i < productImages.length; i++) {
          const result = await cloudUpload(productImages[i], folder);
          imgLinks.push({
            public_id: result.public_id,
            img: result.url,
          });
        }

        req.body.images = imgLinks;
      } catch (error) {
        return next(new ErrorHandler("Failed to update product images", 500));
      }
    }

    // Update product
    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  }),

  /**
   * Delete product and its images
   * @route DELETE /api/products/:id
   * @access Private/Admin
   */
  deleteProduct: catchAsyncErrors(async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    try {
      // Delete cloud images
      for (let i = 0; i < product.images.length; i++) {
        await cloudDelete(product.images[i].public_id);
      }

      await ProductModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to delete product", 500));
    }
  }),

  /**
   * Create or update product review
   * @route POST /api/reviews
   * @access Private
   */
  createReview: catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, product_id } = req.body;

    // Validate input
    if (!rating || !comment || !product_id) {
      return next(
        new ErrorHandler("Please provide rating, comment, and product_id", 400),
      );
    }

    if (rating < 1 || rating > 5) {
      return next(new ErrorHandler("Rating must be between 1 and 5", 400));
    }

    const review = {
      user: req.user._id,
      name: req.user.full_name,
      rating: Number(rating),
      comment,
    };

    const product = await ProductModel.findById(product_id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Check if user already reviewed - fix: use .toString() instead of .id
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString(),
    );

    if (isReviewed) {
      // Update existing review
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      // Add new review
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    // Calculate average rating
    let totalRating = 0;
    product.reviews.forEach((rev) => {
      totalRating += rev.rating;
    });
    product.ratings = totalRating / product.reviews.length;

    // Save without validation to avoid issues
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: isReviewed
        ? "Review updated successfully!"
        : "Review added successfully!",
      product,
    });
  }),

  /**
   * Delete product review
   * @route DELETE /api/reviews
   * @access Private
   */
  deleteReview: catchAsyncErrors(async (req, res, next) => {
    const { productId, id } = req.query;

    // Validate input
    if (!productId || !id) {
      return next(
        new ErrorHandler("Please provide productId and review id", 400),
      );
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Filter out the review to delete
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== id.toString(),
    );

    // Calculate new average rating
    let totalRating = 0;
    reviews.forEach((rev) => {
      totalRating += rev.rating;
    });

    const ratings = reviews.length === 0 ? 0 : totalRating / reviews.length;
    const numOfReviews = reviews.length;

    // Update product - removed deprecated useFindAndModify option
    await ProductModel.findByIdAndUpdate(
      productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  }),

  /**
   * Utility function to mark top-rated products
   * @route POST /api/products/util
   * @access Private/Admin
   */
  productUtil: catchAsyncErrors(async (req, res, next) => {
    const products = await ProductModel.find();

    if (!products || products.length === 0) {
      return next(new ErrorHandler("No products found", 404));
    }

    // Use Promise.all for better performance
    // Fix: Compare ratings as number, not string
    const updatePromises = products.map(async (product) => {
      const isTop = product.ratings >= 4.8; // Fixed: was >= "4.8" (string comparison)

      return ProductModel.findByIdAndUpdate(
        product._id,
        { $set: { top: isTop } },
        { new: true },
      );
    });

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: "Top products updated successfully",
    });
  }),
};
