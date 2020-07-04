const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

require('dotenv').config({
  path: './config/config.env',
});

const bootcamps = require('./routes/bootcamps');
const errorHandler = require('./middleware/error');

// Connect MongoDB
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Morgan logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    `🔥Server is running in ${process.env.NODE_ENV} mode on port ${PORT}🔥`
      .green.bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server and exit process
  server.close(() => process.exit(1));
});
