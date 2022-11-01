const { response } = require("express");
const BannerModel = require("../DB/models/bannerModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../services/errorHandler");
const { cloudUpload, cloudDelete } = require("../services/imageUpload");

module.exports = {
  addBanners: catchAsyncErrors(async (req, res, next) => {
    const images = req.files;
    const folder = "cakeemon/banners";
    let bannerImages = [];
    let imgLinks = [];

    images.forEach((image) => {
      bannerImages.push(image.path);
    });

    for (x in bannerImages) {
      const result = await cloudUpload(bannerImages[x], folder);
      imgLinks.push({
        public_id: result.public_id,
        img: result.url,
      });
    }

    await BannerModel.insertMany(imgLinks)
      .then((result) => {
        res.status(200).json({
          success: 1,
          message: "banners added",
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        return next(new ErrorHandler(err.message, 401));
      });
  }),

  deleteBanner: catchAsyncErrors(async (req, res, next) => {
    await BannerModel.findByIdAndDelete({ _id: req.params.id }).exec(
      async (err, result) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler(err.message, 401));
        }
        
        else if (!result || result == undefined) {
          return next(new ErrorHandler("not found or already deleted", 401));
        }

        {
          await cloudDelete(result.public_id)
            .then((response) => {
              res.status(200).json({
                success: 1,
                message: response.message,
              });
            })
            .catch((err) => {
              console.log(err);
              return next(new ErrorHandler(err.message, 401));
            });
        }
      }
    );
  }),

  getBanners: catchAsyncErrors(async (req, res, next) => {
    await BannerModel.find({}).exec((err, banners) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler(err.message, 401));
      }

      res.status(200).json({
        success: 1,
        banners,
      });
    });
  }),
};
