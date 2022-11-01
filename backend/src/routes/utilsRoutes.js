const express = require("express");
const router = new express.Router();
const isAuthenticated = require("../middleware/auth");
const upload = require("../middleware/multerUpload");

const {
  addBanners,
  deleteBanner,
  getBanners,
} = require("../controllers/bannersControllers");

const {
  addCategory,
  deleteCategory,
  getBCategories,
} = require("../controllers/categoryController");

router.post("/addBanners", isAuthenticated, upload.array("img", 3), addBanners);
router.post("/deleteBanner/:id", isAuthenticated, deleteBanner);
router.get("/getBanners", getBanners);

router.post("/addCategory", isAuthenticated, upload.single("img"), addCategory);
router.post("/deleteCategory/:id", isAuthenticated, deleteCategory);
router.get("/getCategories", getBCategories);

module.exports = router;
