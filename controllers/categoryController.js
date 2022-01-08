const slugify = require('slugify')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')
const Sub = require('../models/subModel')

module.exports = {
	getCategories: async (req, res) => {
		try {
			const categories = await Category.find({})
			res.json(categories)
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	},
	createCategory: async (req, res) => {
		try {
			const { name } = req.body
			const newCategory = await new Category({ name: name, slug: slugify(name) }).save()
			res.json(newCategory)
		} catch (err) {
			res.status(400).send('Create category failed')
		}
	},
	readCategory: async (req, res) => {
		let category = await Category.findOne({ slug: req.params.slug }).exec()
		const products = await Product.find({ category }).populate('category').exec()
		res.json({
			category,
			products,
		})
	},
	updateCategory: async (req, res) => {
		const { nameEdit } = req.body
		try {
			const updated = await Category.findOneAndUpdate(
				{ slug: req.params.slug },
				{ name: nameEdit, slug: slugify(nameEdit) },
				{ new: true }
			)
			res.json(updated)
		} catch (err) {
			res.status(400).send('Category update failed')
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
			res.json(deleted)
		} catch (err) {
			res.status(400).send('Category delete failed')
		}
	},
	getCategorySubs: async (req, res) => {
		let subs = await Sub.find({ parent: req.params._id }).exec()
		res.json(subs)
	},
}
