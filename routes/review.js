const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
// client sending data to server 
router.post("/products/:id/review", async (req, res) => {
  const {id} = req.params;
  // ye (/products/:id/review) page pr form hoga wha se data aa rha hai
  const {rating,comment} = req.body; 
  //find prod of that id for review
  const product = await Product.findById(id);
  // const review = new Review({...req.body})
  const review = new Review({rating,comment});
  product.reviews.push(review);
  //saving changes
  await review.save();
  await product.save();
  // Product.reviews.add()
  console.log(rating);
  console.log(comment);
  res.redirect(`/products/${id}`);
});

module.exports=router;