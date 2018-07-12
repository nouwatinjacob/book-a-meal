
const checkImage = (image) => {
  if (!image) {
    return res.status(400).json({
      message: 'Add image to be uploaded'
    });
  }
};

export default checkImage;