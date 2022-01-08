const router = require('express').Router()
const { userCart, getUserCart, emptyCart } = require('../controllers/cartController')
const { verifyAccessToken } = require('../utils/jwt_helpers')

router.post('/cart', verifyAccessToken, userCart) // create a new cart
router.get('/cart', verifyAccessToken, getUserCart) // get user cart
router.delete('/cart', verifyAccessToken, emptyCart) // delete user cart

module.exports = router
