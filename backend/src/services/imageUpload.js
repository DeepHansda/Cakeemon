const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  cloudUpload: async (path, folder) => {
    console.log(path, folder);

    return await cloudinary.uploader
      .upload(path, {
        folder: folder,
      })
      .then((result) => {
        if (result) {
          return {
            message: "upload successful",
            public_id: result.public_id,
            url: result.url,
          };
        }
      })
      .catch((err) => {
        console.log(err);
        return new ErrorHandler(err.message, 401);
      });
  },

  cloudDelete: async (public_id) => {
    return await cloudinary.uploader
      .destroy(public_id)
      .then((result) => {
        if (result) {
          return {
            message: "deletation successful",
            result,
          };
        }
      })
      .catch((err) => {
        return {
          message: "deletation faild",
          error: err,
        };
      });
  },
};
