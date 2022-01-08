const router = require('express').Router()
const { createCoupon, deleteCoupon, getCoupons } = require('../controllers/couponController')
const { verifyAccessToken, verifyAdminRole } = require('../utils/jwt_helpers.js')

router.post('/coupons', verifyAccessToken, verifyAdminRole, createCoupon)
router.get('/coupons', verifyAccessToken, verifyAdminRole, getCoupons)
router.delete('/coupons/:id', verifyAccessToken, verifyAdminRole, deleteCoupon)

module.exports = router
