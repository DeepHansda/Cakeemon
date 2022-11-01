const BrandModel = require("../DB/models/brandsModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../services/errorHandler");
const { cloudUpload, cloudDelete } = require("../services/imageUpload");

module.exports = {
  addBrand: catchAsyncErrors(async (req, res, next) => {
    const image = req.file;
    const folder = "tapajyoti/brands";
   

  
      const result = await cloudUpload(image.path, folder)
      const data = {
        public_id: result.public_id,
        img: result.url,
        name:req.body.name,
        value:req.body.value
      }
      const _brands = new BrandModel(data)


    await _brands.save((err, result)=>{
        if(err) {
            console.log(err);
            return next(new ErrorHandler(err.message, 401));
        }

        res.status(200).json({
            success: 1,
            message: "brand added",
            result,
          });
    })
  }),

  deleteBrand: catchAsyncErrors(async (req, res, next) => {
    await BrandModel.findByIdAndDelete({ _id: req.params.id }).exec(
      async (err, result) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler(err.message, 401));
        }

        else if(!result || result==undefined){
          return next(new ErrorHandler('not found or already deleted', 401));
        }

        else{
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

  getBrands: catchAsyncErrors(async (req, res, next) => {
    await BrandModel.find({}).exec((err,brands) => {
        if (err) {
            console.log(err);
            return next(new ErrorHandler(err.message, 401));
          }

        res.status(200).json({
            success: 1,
            brands
        })
    })
  })
};
