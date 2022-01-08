const router = require('express').Router()
const {
	createSub,
	deleteSub,
	getSubs,
	readSub,
	updateSub,
} = require('../controllers/subController')
const { verifyAccessToken, verifyAdminRole } = require('../utils/jwt_helpers')

router.post('/subs', verifyAccessToken, verifyAdminRole, createSub)
router.get('/subs', getSubs)
router.get('/subs/:id', readSub)
router.put('/subs/:id', verifyAccessToken, verifyAdminRole, updateSub)
router.delete('/subs/:id', verifyAccessToken, verifyAdminRole, deleteSub)

module.exports = router
