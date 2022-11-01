const CategoryModel = require("../DB/models/categoryModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../services/errorHandler");
const { cloudUpload, cloudDelete } = require("../services/imageUpload");

module.exports = {
  addCategory: catchAsyncErrors(async (req, res, next) => {
    const image = req.file;
    const folder = "tapajyoti/categories";
   

  
      const result = await cloudUpload(image.path, folder)
      const data = {
        public_id: result.public_id,
        img: result.url,
        name:req.body.name,
        value:req.body.value
      }
      const _category = new CategoryModel(data)


    await _category.save((err, result)=>{
        if(err) {
            console.log(err);
            return next(new ErrorHandler(err.message, 401));
        }

        res.status(200).json({
            success: 1,
            message: "category added",
            result,
          });
    })
  }),

  deleteCategory: catchAsyncErrors(async (req, res, next) => {
    await CategoryModel.findByIdAndDelete({ _id: req.params.id }).exec(
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

  getBCategories: catchAsyncErrors(async (req, res, next) => {
    await CategoryModel.find({}).exec((err,categories) => {
        if (err) {
            console.log(err);
            return next(new ErrorHandler(err.message, 401));
          }

        res.status(200).json({
            success: 1,
            categories
        })
    })
  })
};
