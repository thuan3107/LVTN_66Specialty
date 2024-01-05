const Qrcode = require("../models/QrcodeModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");
const cloudinary = require("cloudinary");

// create Product --Admin
exports.createQrcode = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;

  const qrcode = await Qrcode.create(req.body);

  res.status(201).json({
    success: true,
    qrcode,
  });
});

// Get All Product (Admin)
exports.getAdminQrcodes = catchAsyncErrors(async (req, res, next) => {
  const qrcodes = await Qrcode.find();

  res.status(200).json({
    success: true,
    qrcodes,
  });
});

// get All Products
exports.getAllQrcodes = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;

  const qrcodesCount = await Qrcode.countDocuments();

  const feature = new Features(Qrcode.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const qrcodes = await feature.query;
  res.status(200).json({
    success: true,
    qrcodes,
    qrcodesCount,
    resultPerPage,
  });
});

// Update Product ---Admin
exports.updateQrcode = catchAsyncErrors(async (req, res, next) => {
  let qrcode = await Qrcode.findById(req.params.id);
  if (!qrcode) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  qrcode = await Qrcode.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    qrcode,
  });
});

// delete Product
exports.deleteQrcode = catchAsyncErrors(async (req, res, next) => {
  const qrcode = await Qrcode.findById(req.params.id);

  if (!qrcode){
    return next(new ErrorHandler("Qrcode is not found with this id", 404));
  }


  await qrcode.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted succesfully",
  });
});

// single Product details
exports.getSingleQrcode = catchAsyncErrors(async (req, res, next) => {
  const qrcode= await Qrcode.findById(req.params.id);
  if (!qrcode) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    qrcode,
  });
});


