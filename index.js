const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDatabase } = require('./database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
initDatabase()
  .then(() => console.log('Database initialized successfully'))
  .catch(err => {
    console.error('Database initialization error:', err);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  });

// Routes
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', database: 'PostgreSQL' });
});

// Serve static files (frontend)
const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve admin.html
app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

