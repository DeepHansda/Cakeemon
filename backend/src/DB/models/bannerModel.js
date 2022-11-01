const mongoose = require("mongoose");

const utilsSchema = new mongoose.Schema({
      public_id: {
        type: String,
      },
      img: {
        type: String,
      },
},{timestamps:{
  createdAt:true,
  updatedAt:true,
}});


module.exports = mongoose.model('Banners',utilsSchema)