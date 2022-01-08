const router = require('express').Router()
const {
	createOrder,
	deleteOrder,
	getAllOrders,
	getMyOrders,
	getOrderById,
	updateOrderStatus,
	updateOrderToPaid,
} = require('../controllers/orderController')
const { verifyAccessToken, verifyAdminRole } = require('../utils/jwt_helpers')

router.post('/orders', verifyAccessToken, createOrder)
router.get('/orders/:id', verifyAccessToken, getOrderById)
router.get('/orders', verifyAccessToken, getMyOrders)
router.put('/orders/:id/pay', verifyAccessToken, updateOrderToPaid)
router.delete('/orders/:id', verifyAccessToken, deleteOrder)

//admin
router.get('/admin/orders', verifyAccessToken, verifyAdminRole, getAllOrders)
router.put('/admin/orders/:id', verifyAccessToken, verifyAdminRole, updateOrderStatus)

module.exports = router
