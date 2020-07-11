const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } // else if (req.cookies.token) {
  //   token = req.cookies.token
  // }

  if (!token) {
    return next(new ErrorResponse('Unauthorize', 401));
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('Unauthorize', 401));
  }
});

// Grant access to specific role
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(
        `User role ${req.user.role} is unauthorized to access this route`,
        403
      )
    );
  }

  next();
};
