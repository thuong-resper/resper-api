const cloudinary = require('cloudinary')
require('dotenv').config()

const cloudinaryConfig = cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = cloudinaryConfig
