const createError = require('http-errors')
const moment = require('moment')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const User = require('../models/userModel')

module.exports = {
	userCart: async (req, res, next) => {
		try {
			const timeCart = moment().format()
			const { cart } = req.body
			const { id } = req.data
			const userArray = await User.find({ _id: id }).exec()
			const user = userArray[0]
			let products = []

			// check if cart with logged in user id already exist
			let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec()
			if (cartExistByThisUser) {
				cartExistByThisUser.remove()
				console.log('removed old cart')
			}
			for (let i = 0; i < cart.length; i++) {
				let object = {}
				object.product = cart[i].product._id
				object.quantity = cart[i].quantity
				let productFromDb = await Product.findById(cart[i].product._id).select('price').exec()
				object.price = productFromDb.price
				products.push(object)
			}

			let cartTotal = 0
			for (let i = 0; i < products.length; i++) {
				cartTotal = cartTotal + products[i].price * products[i].quantity
			}

			let newCart = await new Cart({ timeCart, products, cartTotal, orderBy: user._id }).save()
			console.log(newCart)
			res.json({ ok: true })
		} catch (error) {
			res.send(createError(404, error))
		}
	},
	getUserCart: async (req, res) => {
		const { id } = req.data
		const userArray = await User.find({ _id: id }).exec()
		const user = userArray[0]

		let cart = await Cart.findOne({ orderBy: user._id })
			.populate('products.product', '_id name price priceCompare image totalAfterDiscount subs')
			.exec()

		res.json(cart)
	},
	emptyCart: async (req, res) => {
		const { id } = req.data
		const userArray = await User.find({ _id: id }).exec()
		const user = userArray[0]

		const cart = await Cart.findOneAndRemove({ orderBy: user._id }).exec()
		res.json(cart)
	},
}
