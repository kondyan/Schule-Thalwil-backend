const cloudinary = require("cloudinary").v2;
const { httpError } = require("../util/http-error");

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const saveImageToCloudinary = async (req, resp, next) => {
  const upload_stream = cloudinary.uploader.upload_stream(
    {
      public_id: req.body.id ? req.body.id : crypto.randomUUID(),
      resource_type: "auto",
      folder: "posts",
    },
    (error, results) => {
      if (error) {
        next(httpError(400, "Invalid Upload"));
      }
      req.imageUrl = results.secure_url;

      next();
    }
  );
  upload_stream.end(req.file.buffer);
};

module.exports = { saveImageToCloudinary };
