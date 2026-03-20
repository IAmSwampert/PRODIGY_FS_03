const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (FIXED)
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

// Routes

// GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD product
app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

const seedProducts = async () => {
  const count = await Product.countDocuments();
  
  if (count === 0) {
    await Product.insertMany([
      {
        name: "T-Shirt",
        price: 499,
        image: "https://via.placeholder.com/150",
        description: "Comfortable cotton t-shirt",
      },
      {
        name: "Shoes",
        price: 999,
        image: "https://via.placeholder.com/150",
        description: "Running shoes",
      },
      {
        name: "Watch",
        price: 1499,
        image: "https://via.placeholder.com/150",
        description: "Stylish watch",
      },
    ]);

    console.log("Sample products added!");
  }
};

seedProducts();