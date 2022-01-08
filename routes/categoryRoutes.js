const router = require('express').Router()
const {
	getCategories,
	readCategory,
	getCategorySubs,
	createCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categoryController')
const { verifyAccessToken, verifyAdminRole } = require('../utils/jwt_helpers')

router.get('/categories', getCategories)
router.get('/categories/:id', readCategory)
router.get('/categories/:id/subs', getCategorySubs)
router.post('/categories', verifyAccessToken, verifyAdminRole, createCategory)
router.put('/categories/:id', verifyAccessToken, verifyAdminRole, updateCategory)
router.delete('/categories/:id', verifyAccessToken, verifyAdminRole, deleteCategory)

module.exports = router
