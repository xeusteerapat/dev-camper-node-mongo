const express = require('express');
const router = express.Router({ mergeParams: true });

const { getReviews, getReview, addReview } = require('../controllers/review');

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');

// Protected middleware
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

router.route('/:id').get(getReview);

module.exports = router;
