
require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "E-Commerce Management API is running" });
});

// Read all products
app.get("/api/products", async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products ORDER BY id");
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Read one product
app.get("/api/products/:id", async (req, res) => {
  try {
    const [products] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(products[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Create a product
app.post("/api/products", async (req, res) => {
  const { name, category, price, stock } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof category !== "string" || !category.trim() ||
    price === undefined || price === null || price === "" ||
    !Number.isFinite(Number(price)) || Number(price) < 0 ||
    !Number.isInteger(Number(stock)) || Number(stock) < 0
  ) {
    return res.status(400).json({ error: "Invalid product details" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)",
      [name.trim(), category.trim(), Number(price), Number(stock)]
    );

    res.status(201).json({
      message: "Product created successfully",
      id: result.insertId
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update a product
app.put("/api/products/:id", async (req, res) => {
  const { name, category, price, stock } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof category !== "string" || !category.trim() ||
    price === undefined || price === null || price === "" ||
    !Number.isFinite(Number(price)) || Number(price) < 0 ||
    !Number.isInteger(Number(stock)) || Number(stock) < 0
  ) {
    return res.status(400).json({ error: "Invalid product details" });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE products SET name = ?, category = ?, price = ?, stock = ? WHERE id = ?",
      [name.trim(), category.trim(), Number(price), Number(stock), req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const [result] = await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Sales analytics endpoints

app.get("/api/analytics/summary", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        COUNT(*) AS total_orders,
        COALESCE(SUM(quantity), 0) AS units_sold,
        COALESCE(SUM(quantity * unit_price), 0) AS total_revenue
      FROM orders
    `);

    res.json(rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch sales summary" });
  }
});

app.get("/api/analytics/top-products", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.id,
        p.name,
        SUM(o.quantity) AS units_sold,
        SUM(o.quantity * o.unit_price) AS revenue
      FROM orders o
      JOIN products p ON p.id = o.product_id
      GROUP BY p.id, p.name
      ORDER BY units_sold DESC, revenue DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch top products" });
  }
});

app.get("/api/analytics/daily-sales", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        DATE(order_date) AS sale_date,
        COUNT(*) AS total_orders,
        SUM(quantity * unit_price) AS revenue
      FROM orders
      GROUP BY DATE(order_date)
      ORDER BY sale_date DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch daily sales" });
  }
});