const express = require("express");
const app = express();
const path = require('path');
const port = 8080;
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')

const bodyParser = require('body-parser');


mongoose.connect('mongodb://127.0.0.1:27017/eDukaan')
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log("DB Connected");
    console.log(err);
});


app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));


const productRoutes=require('./routes/product');
const reviewRoutes=require('./routes/review');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"public")));
app.use(productRoutes);
app.use(reviewRoutes);

app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})