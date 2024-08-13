import {
	VERIFICATION_EMAIL_TEMPLATE,
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		const response = await client.send({
			from: sender,
			to: recipient,
			subject: "Verify Your Email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				"{verificationCode}",
				verificationToken,
			),
			category: "Email Verification",
		});

		console.log("Email Sent Successfully", response);
	} catch (error) {
		console.log("Error Sending Verification", error);
		throw new Error(`Error Sending Verification Email: ${error}`);
	}
};
export const sendWelcomeEmail = async (email, username) => {
	const recipient = [{ email }];

	try {
		const response = await client.send({
			from: sender,
			to: recipient,
			template_uuid: "d7515c57-11c4-43e0-a207-de2e5ba81dda",
			template_variables: {
				company_info_name: "Fokus",
				name: username,
			},
		});

		console.log("Welcome Email Sent Successfully", response);
	} catch (error) {
		console.log("Error Sending Welcome Email", error);

		throw new Error("Error Sending Welcome Email");
	}
};
export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];
	try {
		const response = await client.send({
			from: sender,
			to: recipient,
			subject: "Reset Your Password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.log("Error Sending Password Reset Email", error);

		throw new Error("Error Sending Password Reset Email");
	}
};
export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await client.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});
        console.log("Password Reset email sent successfully", response)
	} catch (error) {
        console.error(`Error sending password reset success email: ${error}`)
        throw new Error(`Error sending password reset success email: ${error}`)
    }
};
