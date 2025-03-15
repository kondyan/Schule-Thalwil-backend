const cloudinary = require("cloudinary").v2;
const { httpError } = require("../util/http-error");

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const saveToCloudinary = async (req, resp, next) => {
  const upload_stream = cloudinary.uploader.upload_stream(
    {
      public_id: req.user.id,
      resource_type: "auto",
      folder: "avatars",
      transformation: [
        { gravity: "face", height: 400, width: 400, crop: "crop" },
        { radius: "max" },
        { width: 200, crop: "scale" },
        { fetch_format: "auto" },
      ],
    },
    (error, results) => {
      if (error) {
        next(httpError(400, "Invalid Upload"));
      }
      req.avatarUrl = results.secure_url;

      next();
    }
  );
  upload_stream.end(req.file.buffer);
};

module.exports = { saveToCloudinary };
