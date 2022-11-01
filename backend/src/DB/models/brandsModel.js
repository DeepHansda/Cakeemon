const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema({
    public_id: {
        type: String,
      },
      img: {
        type: String,
      },
      name: {
        type: String,
      },
      value: {
        type: String,
      },
},{timestamps:{
  createdAt:true,
  updatedAt:true,
}});


module.exports = mongoose.model('Brands',brandsSchema)