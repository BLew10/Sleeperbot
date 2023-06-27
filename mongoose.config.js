const mongoose = require('mongoose');

async function connectDB() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/my_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Successfully connected to the database');
    } catch (error) {
      console.error('Error connecting to the database', error);
    }
  }

connectDB();
