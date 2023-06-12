const express = require('express');
var cors = require('cors')
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_pos'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

// Endpoint to add a new coffee cart
app.post('/api/cart', (req, res) => {
    const cart = req.body;
  
    const { id_pd, Type, name, quantity, price, time } = cart;
  
    const sqlQuery = `INSERT INTO cart_db (id_pd, Type, name, quantity, price, time)
      VALUES (?, ?, ?, ?, ?, ?)`;
  
    connection.query(sqlQuery, [id_pd, Type, name, quantity, price, time], (err, result) => {
      if (err) {
        console.error('Error inserting cart:', err);
        res.sendStatus(500);
      } else {
        console.log('cart inserted successfully');
        res.json(cart);
      }
    });
  });

  app.post('/api/cartdelete', (req, res) => {
    const sqlQuery = `DELETE FROM cart_db`;
  
    connection.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Error deleting cart:', err);
        res.sendStatus(500);
      } else {
        console.log('All data deleted from cart');
        res.sendStatus(200);
      }
    });
  });
  

  app.get('/api/showcart', (req, res) => {
    connection.query('SELECT * FROM cart_db', (err, results) => {
      if (err) {
        console.error('Error fetching cart data:', err);
        res.sendStatus(500);
      } else {
        console.log('Cart data fetched successfully');
        res.json(results);
      }
    });
  });
  

  app.post('/api/order_db', (req, res) => {
    const cart = req.body;
  
    const { id_pd, Type, name, quantity, price} = cart;
  
    const sqlQuery = 'INSERT INTO allorder_db (id_pd, Type, name, quantity, price) VALUES (?, ?, ?, ?, ?)';
  
      connection.query(sqlQuery, [id_pd, Type, name, quantity, price], (err, result) => {
        if (err) {
          console.error('Error inserting cart:', err);
          res.sendStatus(500);
        } else {
          console.log('cart inserted successfully');
          res.json(cart);
        }
      });
    });
    
  app.get('/api/showorderdb', (req, res) => {
    connection.query('SELECT * FROM allorder_db', (err, results) => {
      if (err) {
        console.error('Error fetching cart data:', err);
        res.sendStatus(500);
      } else {
        console.log('Cart data fetched successfully');
        res.json(results);
      }
    });
  });

  // Create a route to handle the insertion of data
  app.post('/api/expenses', (req, res) => {
    const { id_pd, Name_pd, price, quantity } = req.body;
  
    const sql = 'INSERT INTO expensesdb (id_pd, Name_pd, price, quantity) VALUES (?, ?, ?, ?)';
    const values = [id_pd, Name_pd, price, quantity];
  
    connection.execute(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data into the database.');
      }
  
      console.log('Data inserted successfully!');
      return res.status(200).send('Data inserted into the database.');
    });
  });
  

app.get('/api/showex', (req, res) => {
  connection.query('SELECT * FROM expensesdb', (err, results) => {
    if (err) {
      console.error('Error fetching cart data:', err);
      res.sendStatus(500);
    } else {
      console.log('Cart data fetched successfully');
      res.json(results);
    }
  });
});
  
  
  

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
