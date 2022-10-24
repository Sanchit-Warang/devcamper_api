//@desc     Get all bootcamps
//@routes   GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

//@desc     Get single bootcamps
//@routes   GET /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get bootcamp ${req.params.id}` });
};

//@desc     create single bootcamp
//@routes   POST /api/v1/bootcamps/
//@access    Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'new bootcamp created' });
};

//@desc     update single bootcamps
//@routes   PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

//@desc     delete single bootcamps
//@routes   DELETE /api/v1/bootcamps/:id
//@access   private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `delete bootcamp ${req.params.id}` });
};
