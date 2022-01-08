const Coupon = require('../models/couponModel')

module.exports = {
	getCoupons: async (req, res) => {
		try {
			res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec())
		} catch (err) {
			console.log(err)
		}
	},
	createCoupon: async (req, res) => {
		try {
			const { name, expiry, discount } = req.body
			res.json(await new Coupon({ name, expiry, discount }).save())
		} catch (err) {
			console.log(err)
		}
	},
	deleteCoupon: async (req, res) => {
		try {
			res.json(await Coupon.findByIdAndDelete(req.params.id).exec())
		} catch (err) {
			console.log(err)
		}
	},
}
