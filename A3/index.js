const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 80;

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

// Createing a database connection pool
const pool = mysql.createPool(dbConfig);

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Helper function to handle database queries
const query = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        return reject(err);
      }

      connection.query(sql, values, (err, results) => {
        connection.release();

        if (err) {
          console.error('Database query error:', err);
          return reject(err);
        }

        resolve(results);
      });
    });
  });
};

// Post API to Store products
app.post('/store-products', async (req, res) => {
  const products = req.body.products;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // SQL statement for inserting products in products table
    const insertQuery = 'INSERT INTO products (name, price, availability) VALUES ?';
    const values = products.map(product => [product.name, product.price, product.availability]);

    await query(insertQuery, [values]);

    return res.status(200).json({ message: 'Success.' });
  } catch (error) {
    console.error('Error storing products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Post API to List products
app.get('/list-products', async (req, res) => {
  try {
    // SQL statement for selecting products from products table
    const selectQuery = 'SELECT name, price, availability FROM products';

    const results = await query(selectQuery);

    const products = results.map(row => ({
      name: row.name,
      price: row.price.toString(),
      availability: Boolean(row.availability)
    }));

    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error listing products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Starting the server on port 80
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
