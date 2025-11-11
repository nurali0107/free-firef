const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Create pool only if DATABASE_URL is provided
let pool = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  // Test connection
  pool.on('connect', () => {
    console.log('PostgreSQL connected successfully');
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    // Don't exit in production, just log the error
    if (process.env.NODE_ENV !== 'production') {
      console.error('Database connection error. Server will continue but database operations will fail.');
    }
  });
} else {
  console.warn('⚠️  DATABASE_URL not set. Database operations will not work.');
  console.warn('   Set DATABASE_URL in .env file to enable database features.');
}

// Create tables if they don't exist
const createTables = async () => {
  if (!pool) {
    throw new Error('Database pool is not initialized. Please set DATABASE_URL in .env file');
  }
  
  try {
    // Tournaments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tournaments (
        id SERIAL PRIMARY KEY,
        title_kz VARCHAR(255) NOT NULL,
        title_ru VARCHAR(255) NOT NULL,
        title_en VARCHAR(255),
        game VARCHAR(50) NOT NULL CHECK (game IN ('freefire', 'pubg')),
        category VARCHAR(50) NOT NULL CHECK (category IN ('solo', 'duo', 'squad')),
        max_players INTEGER NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        whatsapp_link TEXT,
        rules_kz TEXT NOT NULL,
        rules_ru TEXT NOT NULL,
        rules_en TEXT,
        require_screen_record BOOLEAN DEFAULT true,
        status VARCHAR(50) DEFAULT 'registration' CHECK (status IN ('upcoming', 'registration', 'live', 'completed', 'deleted')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP
      )
    `);

    // Registrations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        tournament_id INTEGER NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
        player_id VARCHAR(255) NOT NULL,
        player_name VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255),
        screen_record_url TEXT,
        team_members JSONB,
        status VARCHAR(50) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(tournament_id, player_id)
      )
    `);

    // Tournament history table (for deleted tournaments)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tournament_history (
        id SERIAL PRIMARY KEY,
        tournament_id INTEGER NOT NULL,
        title_kz VARCHAR(255) NOT NULL,
        title_ru VARCHAR(255) NOT NULL,
        title_en VARCHAR(255),
        game VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        max_players INTEGER NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        whatsapp_link TEXT,
        rules_kz TEXT NOT NULL,
        rules_ru TEXT NOT NULL,
        rules_en TEXT,
        players_data JSONB,
        deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add title_en and rules_en columns if they don't exist (for existing databases)
    try {
      await pool.query(`ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS title_en VARCHAR(255)`);
      await pool.query(`ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS rules_en TEXT`);
      await pool.query(`ALTER TABLE tournament_history ADD COLUMN IF NOT EXISTS title_en VARCHAR(255)`);
      await pool.query(`ALTER TABLE tournament_history ADD COLUMN IF NOT EXISTS rules_en TEXT`);
    } catch (err) {
      // Columns might already exist, ignore error
      console.log('Columns might already exist:', err.message);
    }

    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_registrations_tournament_id ON registrations(tournament_id);
      CREATE INDEX IF NOT EXISTS idx_registrations_player_id ON registrations(player_id);
      CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
      CREATE INDEX IF NOT EXISTS idx_tournaments_date ON tournaments(date);
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

// Initialize database
const initDatabase = async () => {
  try {
    await createTables();
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

module.exports = {
  pool,
  initDatabase
};

