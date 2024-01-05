const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  price: {
    type: Number,
   
  },
  image: {
    type: String,
    
  },
  quantity: {
    type: Number,
   
  },
  userId: {
    type: String,
   
  },
  productId: {
    type: String,
   
  },
  stock: {
    type: Number,
  
  }
});

module.exports = mongoose.model("Cart", cartSchema);
