const slugify = require('slugify')
const Product = require('../models/productModel')
const Sub = require('../models/subModel')

module.exports = {
	getSubs: async (req, res) => {
		res.json(await Sub.find({}).sort({ createdAt: -1 }).exec())
	},
	createSub: async (req, res) => {
		try {
			const { name, parent } = req.body
			const newSub = await new Sub({ name, parent, slug: slugify(name) }).save()
			res.json(newSub)
		} catch (err) {
			console.log('SUB CREATE ERR ----->', err)
			res.status(400).send('Create sub failed')
		}
	},
	readSub: async (req, res) => {
		let sub = await Sub.findOne({ slug: req.params.id }).exec()
		const products = await Product.find({ subs: sub }).populate('category').exec()
		res.json({
			sub,
			products,
		})
	},
	updateSub: async (req, res) => {
		const { name, parent } = req.body
		try {
			const updated = await Sub.findOneAndUpdate(
				{ slug: req.params.id },
				{ name, parent, slug: slugify(name) },
				{ new: true }
			)
			res.json(updated)
		} catch (err) {
			res.status(400).send('Sub update failed')
		}
	},
	deleteSub: async (req, res) => {
		try {
			const deleted = await Sub.findOneAndDelete({ slug: req.params.id })
			res.json(deleted)
		} catch (err) {
			res.status(400).send('Sub delete failed')
		}
	},
}
