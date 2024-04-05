const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error connecting to the database:");
    console.error(err); // Fix: Print the actual error
  });
const products = [
  {
    name: "i phone 11",
    img: "https://source.unsplash.com/random/?iphone",
    desc: "iPhone 14. Super Retina XDR display;",
    price: 150000,
  },
  {
    name: "Shoes",
    img: "https://source.unsplash.com/random/?shoe",
    desc: "EK dum mast juta hai bidu",
    price: 150000,
  },
  {
    name: "watch",
    img: "https://source.unsplash.com/random/?watch",
    desc: "apnaa time aigaa nhi, aa gyaa",
    price: 1800,
  },
  {
    name: "Mac Book Pro",
    img: "https://source.unsplash.com/random/?macbook",
    desc: "ha bro mac book use karta hu tu bhi kharid ke",
    price: 95000,
  },
  {
    name: "Drones",
    img: "https://source.unsplash.com/random/?drone",
    desc: "tu kya kaaregaa drone kharid kar",
    price: 25000,
  },
];
// asyn function seedDB()
Product.insertMany(products)
.then(() => {
  console.log("Products seeded");
})
.catch((err) => {
  console.error("Error seeding products:", err);
});