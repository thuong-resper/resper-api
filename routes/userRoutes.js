const router = require('express').Router()
const {
	activeEmail,
	addToWishlist,
	changePassword,
	forgotPassword,
	getProfile,
	login,
	loginByGoogle,
	refreshToken,
	registerUser,
	removeFromWishlist,
	resetPassword,
	saveAddress,
	updateUserImage,
	updateUserInfo,
	applyCoupon,
} = require('../controllers/userController')
const { verifyAccessToken } = require('../utils/jwt_helpers')

router.post('/user/register', registerUser)
router.post('/user/change-password', verifyAccessToken, changePassword)
router.post('/user/google-login', loginByGoogle)
router.post('/user/login', login)
router.get('/user/profile', verifyAccessToken, getProfile)
router.post('/user/refresh-token', refreshToken)
router.post('/user/active-email', activeEmail)
router.post('/user/forgot-password', forgotPassword)
router.put('/user/update-image', verifyAccessToken, updateUserImage)
router.put('/user/update-info', verifyAccessToken, updateUserInfo)
router.put('/user/reset-password', resetPassword)
router.post('/user/address', verifyAccessToken, saveAddress)

// coupon
router.post('/user/cart/coupon', verifyAccessToken, applyCoupon)
router.post('/user/wishlist', verifyAccessToken, addToWishlist)
router.get('/user/wishlist', verifyAccessToken, addToWishlist)
router.put('/user/wishlist/:productId', verifyAccessToken, removeFromWishlist)

module.exports = router
