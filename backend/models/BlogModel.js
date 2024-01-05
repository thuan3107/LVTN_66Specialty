const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Please enter a name of a product"],
        trim: true,
        maxLength:[200, "Product name not exceed than 20 characters"]
    },
    description:{
        type: String,
        required:[true, "Please add a description of your product"],
        // minlength:[10,"Description is can not exceed than 100 characters"]
    },

    ratings:{
        type: Number,
        default: 0,
    },
    images:[
        {
            public_id:{
                type:String,
                // required:true,
            },
            url:{
                type:String,
                //  required:true,
            }
          
        }
    ],
  
  numOfReviews:{
      type: Number,
      default: 0
  },
  reviews:[
      {
          user: {
              type:mongoose.Schema.ObjectId,
              ref:"User",
              required: true,
          },
          name:{
              type: String,
              required: true,
          },
          rating:{
              type: Number,
              required: true,
          },
          comment:{
              type:String,
          },
          time:{
              type: Date,
              default: Date.now()
          },
      },
  ],
  user:{
      type: mongoose.Schema.ObjectId,
      ref:"User",
      required: true
  },
  createAt:{
      type:Date,
      default: Date.now()
  }
})

module.exports = mongoose.model("Blog",blogSchema);