const { google } = require('googleapis')
const nodemailer = require('nodemailer')

const {
	MAILING_SERVICE_CLIENT_ID,
	MAILING_SERVICE_CLIENT_SECRET,
	SENDER_EMAIL_ADDRESS,
	MAILING_SERVICE_REFRESH_TOKEN,
	REDIRECT_URI,
	PASSWORD_EMAIL,
} = process.env

const oauth2Client = new google.auth.OAuth2(
	MAILING_SERVICE_CLIENT_ID,
	MAILING_SERVICE_CLIENT_SECRET,
	MAILING_SERVICE_REFRESH_TOKEN,
	REDIRECT_URI
)
const sendMailWallet = (to, subject, wallet, address, key) => {
	oauth2Client.setCredentials({ refresh_token: MAILING_SERVICE_REFRESH_TOKEN })
	const accessToken = oauth2Client.getAccessToken()
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: SENDER_EMAIL_ADDRESS,
			name: 'Thuong',
			pass: PASSWORD_EMAIL,
			clientId: MAILING_SERVICE_CLIENT_ID,
			clientSecret: MAILING_SERVICE_CLIENT_SECRET,
			refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
			accessToken: accessToken,
		},
	})
	const mailOptions = {
		from: `Thuong Luong ${SENDER_EMAIL_ADDRESS}`,
		to: to,
		subject: subject,
		html: `<!DOCTYPE html>
    <html>
    <body>
      <p>${wallet}</p>
      <p>${address}</p>
      <p>${key}</p>
    </body>
    </html>`,
	}

	transport.sendMail(mailOptions, (err, inFor) => {
		if (err) return err
		return inFor
	})
}

module.exports = sendMailWallet
