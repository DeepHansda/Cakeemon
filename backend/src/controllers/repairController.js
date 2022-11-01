const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Repair = require("../DB/models/repairModel");
const ErrorHandler = require("../services/errorHandler");
module.exports = {
  createRepair: catchAsyncErrors(async (req, res, next) => {
    const repair = new Repair(req.body);
    await repair.save((err, result) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("something went wrong", 401));
      }

      res.status(200).json({
        success: 1,
        message: "request saved successfully",
        result,
      });
    });
  }),

  getRepairs: catchAsyncErrors(async (req, res, next) => {
    await Repair.find({}).exec((err, repair) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("something went wrong", 401));
      } else if (!repair || repair.length === 0) {
        return next(new ErrorHandler("no requests found", 401));
      } else {
        res.status(200).json({
          success: 1,
          repair,
        });
      }
    });
  }),

  getRepairById: catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    await UserModel.find({ _id: id }).exec((err, result) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("something went wrong", 401));
      } else if (!result || result.length === 0) {
        return next(new ErrorHandler("does not exist", 401));
      } else {
        res.status(200).json({
          success: 1,
          result,
        });
      }
    });
  }),

  deleteRepair: catchAsyncErrors(async (req, res, next) => {
    await Order.findByIdAndDelete({
      _id: req.params.id,
    }).exec((err, result) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorHandler("deletation failed, something went wrong", 401)
        );
      } else if (!result || result === null) {
        return next(new ErrorHandler("repair not found", 401));
      }
      res.status(200).json({
        success: 1,
        message: "Repair deleted successfully",
        result,
      });
    });
  }),
};
