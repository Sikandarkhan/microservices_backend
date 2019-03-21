// Mailgun mail content
const mailTestLink = 'https://www.w3schools.com/test/names.asp';
const fromMail = 'dev@predator-digital.com';

const sendVerificationMail = (userMail, verification_code, rootUrl) => {
	const tempUrl = `${rootUrl || mailTestLink}/activateaccount`;
	// The usermail id's should be later replaced with tokens that can be used to
	// identify the users
	return {
		from: `Excited User <${fromMail}>`,
		to: `${userMail}`,
		subject: 'Verification mail',
		html: `<p>Please use the below link to verify your email address 
		${tempUrl}?emailid=${userMail}&token=${verification_code}</p>
		`
	};
};

const forgotPasswordMail = (userMail, encryptedMail, rootUrl) => {
	// The rootUrl is temporary (for now it gives the public DNS of ec2 server)
	return {
		from: `Store owner <${fromMail}>`,
		to: `${userMail}`,
		subject: 'Forgot password',
		html: `<p>Please use this link to reset your password
		${rootUrl}/resetpassword?token=${encryptedMail}</p>`
	};
};

module.exports = {
	sendVerificationMail,
	forgotPasswordMail,
}