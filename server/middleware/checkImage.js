
const checkImage = (req, res, next) => {
  if (req.file && req.file.path) {
    return next;
  }
  return res.status(400).json({
    message: 'Add Image to be uploaded'
  });
};

export default checkImage;
