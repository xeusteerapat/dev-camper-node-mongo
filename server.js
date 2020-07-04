const express = require('express');
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');

require('dotenv').config({
  path: './config/config.env',
});

const app = express();

const PORT = process.env.PORT || 5000;

// Morgan logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.listen(PORT, () => {
  console.log(
    `🔥Server is running in ${process.env.NODE_ENV} mode on port ${PORT}🔥`
  );
});
