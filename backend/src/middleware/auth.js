const ErrorHandler = require("../services/errorHandler");
const tokenHandler = require("../services/tokenHandler");
const jwt = require("jsonwebtoken");
const UserModel = require("../DB/models/userModel");
const catchAsyncErrors = require("./catchAsyncErrors");
module.exports = isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(
      new ErrorHandler("something went wrong while login or try again", 401)
    );
  }

  const decodedId = await jwt.verify(token, process.env.JWT_KEY);

  req.user = await UserModel.findById({ _id: decodedId.id });
  next();
});

// Admin Roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources`)
      );
    }
    next();
  };
};
