const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema(
	{
		wallet: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		key: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Wallet', walletSchema)
