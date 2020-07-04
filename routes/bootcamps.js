const express = require('express');
const router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'List all bootcamps',
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get single bootcamp with id ${req.params.id}`,
  });
});

router.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Create bootcamp',
  });
});

router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update bootcamps ${req.params.id}`,
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamps ${req.params.id}`,
  });
});

module.exports = router;
