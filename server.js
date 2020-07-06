const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const path = require('path');
const connectDB = require('./config/db');

require('dotenv').config({
  path: './config/config.env',
});

const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
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

// File uploading
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
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
