const mongoose = require("mongoose");
const Review = require('./review')
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  img: {
    type: String,
    trim: true,
    default: "/images/product.jpg",
  },
  price: {
    type: Number,
    trim: true,
    default: 0,
  },
  desc: { 
    type: String,
    trim: true,
  },
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    // will tell later what is ref
    // iski help se pura ka pura review uth kr aa jaiga 
    // obj id actual doc me convert ho jaigi 
    ref:'Review'
  }],
});
productSchema.post('findOneAndDelete', async function (doc) {
  if(doc.reviews.length > 0){
    await Review.deleteMany({_id: {$in: doc.reviews}});
  }
});
const Product = mongoose.model('Product',productSchema);
module.exports = Product;