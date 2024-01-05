const mongoose = require("mongoose");

const qrcodeSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:[true, "Nhập vào tên sản phẩm"],
      
    },
    code:{
        type:String,
        required:[true, "Nhập vào mã sản phẩm"],
      
    },
    description:{
        type:String,
        required:[true, "Nhập vào mô tả sản phẩm"],
        maxlength:[4000,"Description is can not exceed than 4000 characters"]
    },
    price:{
        type:Number,
        required: [true, "Nhập vào giá sản phẩm"],

    },
    exprire_date:{
        type:String,
        required: [true, "Nhập vào HSD sản phẩm"],
    },

    images:{ type:Array},
    category:{
        type: String,
        required:[true,"Please add a category of your product"],
    },
    
  createAt:{
      type:Date,
      default: Date.now()
  }
})

module.exports = mongoose.model("Qrcode",qrcodeSchema);