// @desc  Get all bootcamps
// @routes  GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'List all bootcamps',
  });
};

// @desc  Get single bootcamps
// @routes  GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Get single bootcamp with id ${req.params.id}`,
  });
};

// @desc  Create single bootcamps
// @routes  POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Create new bootcamp`,
  });
};

// @desc  Update single bootcamps by id
// @routes  PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update bootcamp with id ${req.params.id}`,
  });
};

// @desc  Delete single bootcamps by id
// @routes  DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamp with id ${req.params.id}`,
  });
};
