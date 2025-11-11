const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { initDatabase } = require('./database');

dotenv.config();

const app = express();
// Use PORT from environment variable (Render sets this automatically)
// Fallback to 5000 for local development to match HTML files
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
if (process.env.DATABASE_URL) {
  initDatabase()
    .then(() => console.log('✅ Database initialized successfully'))
    .catch(err => {
      console.error('❌ Database initialization error:', err.message);
      console.warn('⚠️  Server will continue but database operations may fail.');
      // Don't exit, allow server to start even if database fails
    });
} else {
  console.warn('⚠️  DATABASE_URL not set. Server will start but database features will not work.');
  console.warn('   To enable database: Create .env file in server/ directory with DATABASE_URL=your_connection_string');
}

// API Routes
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    database: 'PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

// Serve static files (HTML files from root directory)
app.use(express.static(path.join(__dirname, '..')));

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve admin.html
app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin.html'));
});

// Serve sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/sitemap.xml'));
});

// Serve robots.txt
app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/robots.txt'));
});

// Start server
// Bind to 0.0.0.0 to accept connections from Render's load balancer
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Listening on 0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
  console.log(`HTML files served from: ${path.join(__dirname, '..')}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

