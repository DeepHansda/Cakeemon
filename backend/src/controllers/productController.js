const ProductModel = require("../DB/models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../services/apiFeatures");
const { cloudUpload, cloudDelete } = require("../services/imageUpload");
const ErrorHandler = require("../services/errorHandler");

module.exports = {
  // create product-----------------------

  createProduct: catchAsyncErrors(async (req, res, next) => {
    const images = req.files;
    let productImages = [];

    images.forEach((image) => {
      productImages.push(image.path);
    });

    const folder = "tapajyoti/products";
    const imgLinks = [];
    for (x in productImages) {
      const result = await cloudUpload(productImages[x], folder);
      imgLinks.push({
        public_id: result.public_id,
        img: result.url,
      });
    }
    console.log(req.user)

    req.body.images = imgLinks;
    // res.body.createdBy = req.user._id;

    const product = new ProductModel(req.body);
    await product.save((err, result) => {
      if (err) {
        // console.log(err)
        return next(new ErrorHandler("something went wrong", 401));
      }

      res.status(200).json({
        success: 1,
        message: "product added !",
        result,
      });
    });
  }),

  // get all Products-------------

  getAllProducts: catchAsyncErrors(async (req, res, next) => {
    const productPerPage = 8;
    const productsCount = await ProductModel.countDocuments();

    const apiFeature = new ApiFeatures(ProductModel.find({}), req.query)
      .search()
      .filter();

    apiFeature.pagination(productPerPage);

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;

    next(
      res.status(201).json({
        success: 1,
        products,
        filteredProductsCount,
        productsCount,
        productPerPage,
      })
    );
  }),

  // get all products for admin

  getAdminProducts: catchAsyncErrors(async (req, res, next) => {
    await ProductModel.find().exec((err, result) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("something went wrong", 401));
      } else if (!result || result.length == 0) {
        return next(new ErrorHandler("result not found", 401));
      } else {
        return next(
          res.status(201).json({
            success: 1,
            result: result,
          })
        );
      }
    });
  }),

  // get product details

  getProductDetails: catchAsyncErrors(async (req, res, next) => {
    await ProductModel.findById({
      _id: req.params.id,
    }).exec((err, product) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("something went wrong", 401));
      } else if (product == null || !product) {
        console.log(product);
        return next(new ErrorHandler("product not found", 401));
      } else {
        return next(
          res.status(201).json({
            success: 1,
            product,
          })
        );
      }
    });
  }),

  // update product

  updateProduct: catchAsyncErrors(async (req, res, next) => {
    let productImages = [];
    if (req.files.length > 0) {
      productImages = req.files.map((file) => {
        return file.path;
      });
    }
    const folder = "tapajyoti/products";
    const imgLinks = [];

    const products = await ProductModel.findOne({ _id: req.params.id }).exec(
      (err, product) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler("something went wrong", 401));
        }
        if (product == null || !product) {
          return next(new ErrorHandler("product not found", 401));
        }
      }
    );

    if (productImages !== undefined || productImages.length > 0) {
      for (x in products.images) {
        await cloudDelete(products.images[x].public_id);
      }
      for (x in productImages) {
        const result = await cloudUpload(productImages[x], folder);
        imgLinks.push({
          public_id: result.public_id,
          img: result.url,
        });
      }
    }

    req.body.images = imgLinks;

    await ProductModel.findByIdAndUpdate({ _id: req.params.id }, req.body).exec(
      (err, result) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler("something went wrong", 401));
        }

        res.status(200).json({
          success: 1,
          message: "product updated",
          result,
        });
      }
    );
  }),

  // delete product
  deleteProduct: catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    await ProductModel.findOne({
      _id: id,
    }).exec(async (err, product) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("something went wrong", 401));
      } else if (product == null || !product) {
        return next(new ErrorHandler("product not found", 401));
      } else {
        // delete cloud images
        for (x in product.images) {
          await cloudDelete(product.images[x].public_id);
        }
        ProductModel.findByIdAndDelete({
          _id: id,
        }).exec((err, result) => {
          if (err) {
            return next(new ErrorHandler("deletation failed", 401));
          }

          res.status(200).json({
            success: 1,
            message: "deletataion successful",
            result,
          });
        });
      }
    });
  }),

  createReview: catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, product_id } = req.body;
    console.log(req.user);
    const review = {
      user: req.user._id,
      name: req.user.full_name,
      rating: Number(rating),
      comment,
    };

    await ProductModel.findById(product_id).exec(async (err, product) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler(err.message, 401));
      } else if (product == null || !product) {
        return next(new ErrorHandler("product not found", 401));
      } else {
        const isReviewed = product.reviews.find(
          (rev) => rev.user.id === req.user._id
        );

        if (isReviewed) {
          product.reviews.forEach((rev) => {
            if (rev.user.id === req.user._id) {
              rev.rating = rating;
              rev.comment = comment;
            }
          });
        } else {
          product.reviews.push(review);
          product.numOfReviews = product.reviews.length;
        }

        let avg = 0;
        product.reviews.forEach((rev) => (avg += rev.rating));
        product.ratings = avg / product.reviews.length;

        await product.save((err, result) => {
          if (err) {
            console.log(err);
            return next(new ErrorHandler(err.message, 401));
          }

          res
            .status(200)
            .json({ success: 1, message: "review saved!", result });
        });
      }
    });
  }),

  deleteReview: catchAsyncErrors(async (req, res, next) => {
    await ProductModel.findById(req.query.productId).exec(
      async (err, product) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler(err.message, 401));
        } else if (product == null || !product) {
          return next(new ErrorHandler("product not found", 401));
        } else {
          const reviews = product.reviews.filter(
            (rev) => rev._id.toString() !== req.query.id.toString()
          );

          let avg = 0;

          reviews.forEach((rev) => {
            avg += rev.rating;
          });

          let ratings = 0;

          if (reviews.length === 0) {
            ratings = 0;
          } else {
            ratings = avg / reviews.length;
          }

          const numOfReviews = reviews.length;

          await ProductModel.findByIdAndUpdate(
            req.query.productId,
            {
              reviews,
              ratings,
              numOfReviews,
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          ).exec((err, result) => {
            if (err) {
              console.log(err);
              return next(new ErrorHandler(err.message, 401));
            }

            res.status(200).json({
              success: 1,
              message: "review deleted",
              result,
            });
          });
        }
      }
    );
  }),
};
