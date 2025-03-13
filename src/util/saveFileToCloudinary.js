const cloudinary = require("cloudinary");
const fs = require("node:fs/promises");
const multer = require("multer");
const path = require("path");

const localPath = path.join(__dirname, "../", "uploads");

const storageConfig = multer.diskStorage({
  destination: localPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

cloudinary.v2.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { upload, saveFileToCloudinary };
