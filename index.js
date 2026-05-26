import express from "express";
import cors from "cors";

import { Products as mockProducts } from "./mockData/mockProducts.js";

const app = express();

let products = [...mockProducts];

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /products = GET all products
app.get("/products", (req, res) => {
  // case: query name (/products?name=Keyboard)
  try {
    const { name } = req.query;
    if (name) {
      const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase()),
      );
      return res.status(200).json({ success: true, data: filteredProducts });
    }

    // case: no query, return all products
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
});

// GET /products/:id = GET a single product by ID
app.get("/products/:id", (req, res) => {
  try {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching product" });
  }
});

// POST /products = CREATE a new product
app.post("/products", (req, res) => {
  try {
    const { name, price, quantity, description, category } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Name is required and must be a string",
      });
    }
    if (price === undefined || typeof price !== "number") {
      return res
        .status(400)
        .json({ success: false, message: "Price must be a number" });
    }

    const finalQuantity =
      quantity !== undefined && typeof quantity === "number" ? quantity : 1;

    const newProduct = {
      id: String(Date.now()),
      name,
      price,
      quantity: finalQuantity,
      description: description || "",
      category: category || "General",
    };

    products.push(newProduct);
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error creating product" });
  }
});

// PUT /products/:id = UPDATE a existing product by ID
app.put("/products/:id", (req, res) => {
  const { name, price, quantity, description, category } = req.body;
  try {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (name && typeof name !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Name must be a string" });
    }
    if (price !== undefined && typeof price !== "number") {
      return res
        .status(400)
        .json({ success: false, message: "Price must be a number" });
    }
    if (quantity !== undefined && typeof quantity !== "number") {
      return res
        .status(400)
        .json({ success: false, message: "Stock must be a number" });
    }

    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (description) product.description = description;
    if (category) product.category = category;

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error updating product" });
  }
});

// DELETE /products/:id = DELETE a product by ID
app.delete("/products/:id", (req, res) => {
  try {
    const productId = req.params.id;

    const foundProduct = products.find((p) => p.id === productId);

    if (!foundProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    products = products.filter((p) => p.id !== productId);
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting product" });
  }
});

// centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: "Something went wrong on the server!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
