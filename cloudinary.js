const cloudinary = require('cloudinary')

module.exports = {
	uploads: (file) => {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		})

		return new Promise((resolve, reject) => {
			cloudinary.v2.uploader.upload(
				file,
				{
					resource_type: 'auto',
					upload_preset: 'shop_products', // name folder that configured on cloudinary
				},
				(err, res) => {
					if (err) {
						reject(err)
					} else {
						return resolve({
							url: res.url,
							id: res.public_id,
						})
					}
				}
			)
		})
	},

	// call from server when delete a product
	removes: (images) => {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		})
		for (let index = 0; index < images.length; index++) {
			cloudinary.uploader.destroy(images[index].id, (err, result) => {})
		}
	},
}
