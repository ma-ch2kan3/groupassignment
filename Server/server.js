const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TaxiRankdb',
  password: 'ts51454766',
  port: 5432,
});

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:8081', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Route to register a car
app.post('/register-car', async (req, res) => {
  const { plate_number, car_owner, destination, departure_time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cars (plate_number, car_owner, destination, departure_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [plate_number, car_owner, destination, departure_time]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error registering car:', err);
    res.status(500).json({ error: 'Error registering car' });
  }
});

// Route to get all registered cars
app.get('/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ error: 'Error fetching cars' });
  }
});

// Route to search cars
app.get('/search-cars', async (req, res) => {
  const { destination, time } = req.query;
  
  // Check if destination and time are provided
  if (!destination || !time) {
    return res.status(400).json({ error: 'Destination and time are required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM cars WHERE destination = $1 AND departure_time = $2',
      [destination, time]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error searching cars:', err);
    res.status(500).json({ error: 'Error searching cars' });
  }
});

// Route to update a car
app.put('/update-car', async (req, res) => {
  const { plate_number, column, value } = req.body;
  if (!['plate_number', 'car_owner', 'destination', 'departure_time'].includes(column)) {
    return res.status(400).json({ error: 'Invalid column' });
  }
  const query = `UPDATE cars SET ${column} = $1 WHERE plate_number = $2 RETURNING *`;
  try {
    const result = await pool.query(query, [value, plate_number]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating car:', err);
    res.status(500).json({ error: 'Error updating car' });
  }
});

// Route to register a spector
app.post('/register-spector', async (req, res) => {
  const { spectorId, name, address, password, email } = req.body;
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO spectors (spectorid, spectorname, spectoraddress, spectorpassword, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [spectorId, name, address, hashedPassword, email] 
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error registering spector:', err);
    res.status(500).json({ error: 'Error registering spector' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
