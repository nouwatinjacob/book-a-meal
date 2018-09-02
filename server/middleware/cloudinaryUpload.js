import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinaryConfig from '../middleware/cloudinaryConfig';

cloudinaryConfig();

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'BookMeal/',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  filename: (req, file, callback) => {
    callback(undefined, Number(Date.now()) + file.originalname);
  }
});

const cloudinaryUpload = multer({ storage });

export default cloudinaryUpload;