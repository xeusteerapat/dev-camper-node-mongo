const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc  Get all reviews
// @routes  GET /api/v1/reviews
// @routes  GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc  Get single review
// @routes  GET /api/v1/reviews/:id
// @routes  GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  return res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc  Add review
// @routes  POST /api/v1/bootcamps/:bootcampId/review
// @access Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `There is no bootcamp with id ${req.params.bootcampId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  return res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc  Update review
// @routes  PUT /api/v1/reviews/:id
// @access Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`There is no review with id ${req.params.id}`, 404)
    );
  }

  // Check user permission
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update this review`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await review.save();

  return res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc  Delete review
// @routes  DELTE /api/v1/reviews/:id
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`There is no review with id ${req.params.id}`, 404)
    );
  }

  // Check user permission
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update this review`, 401));
  }

  await review.remove();

  return res.status(200).json({
    success: true,
    data: {},
  });
});
