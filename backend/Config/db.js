const mongoose = require('mongoose');

const connnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connnectDB;
