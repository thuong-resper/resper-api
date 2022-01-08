const router = require('express').Router()
const { creatWallet, getWallets } = require('../controllers/walletController')
const { verifyAccessToken, verifyAdminRole } = require('../utils/jwt_helpers')

router.get('/wallets', verifyAccessToken, verifyAdminRole, getWallets)
router.post('/wallets', creatWallet)

module.exports = router
