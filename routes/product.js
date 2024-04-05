const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
router.get("/products", async (req, res) => {
  //fetch data
  const products = await Product.find({});
  //rendering on that url
  res.render("products/index", { products });
});

router.get("/products/new", async (req, res) => {
  res.render("products/new");
});
router.post("/products/new", async (req, res) => {
  const { name, img, desc, price } = req.body;
  await Product.create({ name, img, desc, price });
  res.redirect("/products");
});
//show prod
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  //review bhi aaiga obj me because of populate : show or seach karte time hame populate ki need hai so that we can see the object id data
  const product = await Product.findById(id).populate("reviews");
  res.render("products/show", { product });
});
router.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});
router.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, img, desc, price } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      img,
      desc,
      price,
    });
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.redirect(`/products/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  // const product = await Product.findById(id);
  // for( let id of product.reviews){
  //   await Review.findByIdAndDelete(id);
  // }
  // we will use middleware
  const deleteProduct = await Product.findByIdAndDelete(id);
  res.redirect(`/products`);
});
module.exports = router;
