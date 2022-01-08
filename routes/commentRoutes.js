const router = require('express').Router()
const {
	deleteIdComment,
	getIdProduct,
	historyComment,
} = require('../controllers/commentController')
const { verifyAccessToken } = require('../utils/jwt_helpers.js')

router.get('/comments', getIdProduct)
router.get('/comments/:id', verifyAccessToken, historyComment)
router.delete('/comments/:id', verifyAccessToken, deleteIdComment)

module.exports = router
