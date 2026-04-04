const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.production' });

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI environment variable is not set in .env.production');
  process.exit(1);
}

let db;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('electronic-shops');
    console.log('✓ Connected to MongoDB database: electronic-shops');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

// Routes

// GET /brands - Fetch all brands or filter by name
app.get('/brands', async (req, res) => {
  try {
    const { name } = req.query;
    const query = name ? { name: { $regex: name, $options: 'i' } } : {};
    
    const brands = await db.collection('brands').find(query).toArray();
    res.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /categories - Fetch all categories or filter by name
app.get('/categories', async (req, res) => {
  try {
    const { name } = req.query;
    const query = name ? { name: { $regex: name, $options: 'i' } } : {};
    
    const categories = await db.collection('categories').find(query).toArray();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /products - Fetch all products
app.get('/products', async (req, res) => {
  try {
    const { brand, category } = req.query;
    const query = {};
    
    if (brand) query.brand = brand;
    if (category) query.category = category;
    
    const products = await db.collection('products').find(query).toArray();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /products/:id - Fetch a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.collection('products').findOne({ id: parseInt(id) });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ API endpoints available:`);
    console.log(`  - GET /brands`);
    console.log(`  - GET /categories`);
    console.log(`  - GET /products`);
    console.log(`  - GET /products/:id`);
  });
});

