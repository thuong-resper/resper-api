const router = require('express').Router()
const multer = require('multer')
const {
	createProduct,
	deleteProduct,
	getProducts,
	listRelated,
	productsCount,
	readProduct,
	searchFilters,
	updateProduct,
} = require('../controllers/productController')
const { verifyAccessToken, verifyAdminRole } = require('../utils/jwt_helpers')

//cloudinary
let upload = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
			cb(new Error('File is not supported'), false)
			return
		}

		cb(null, true)
	},
})

router.post('/products', upload.array('image'), verifyAccessToken, verifyAdminRole, createProduct)
router.get('/products/total', productsCount)
router.get('/products', getProducts)
router.get('/products/:id', readProduct)
router.delete('/products/:id', verifyAccessToken, verifyAdminRole, deleteProduct)
router.put(
	'/products/:id',
	upload.array('image'),
	verifyAccessToken,
	verifyAdminRole,
	updateProduct
)

// related
router.get('/products/related', listRelated)

// search
router.get('/products/search/filters', searchFilters)

module.exports = router
