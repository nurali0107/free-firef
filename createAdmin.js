const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tournament', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Admin credentials
    const username = process.argv[2] || 'admin';
    const email = process.argv[3] || 'admin@example.com';
    const password = process.argv[4] || 'admin123';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();

    console.log('Admin user created successfully!');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role: admin');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();

