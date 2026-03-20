import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

// Initialize with the dynamic env variable
// Fallback to empty string to prevent crashing during build if not set
const resend = new Resend(env.RESEND_API_KEY || 're_123');

export async function sendPasswordReset(to: string, name: string | null, resetLink: string) {
	const safeName = name || 'Customer';

	await resend.emails.send({
		from: 'HybornCV <info@hyborncv.com>',
		to,
		subject: 'Reset your password',
		html: `
		<div style="background-color: #f4f7fa; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
			<div style="text-align: center; margin-bottom: 24px;">
				<img src="https://hyborncv.com/hylogo2.png" alt="HybornCV" style="width: 48px; height: 48px; object-fit: contain;" />
			</div>
			<div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-top: 4px solid #7F00FF; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-radius: 0 0 8px 8px;">
				<h1 style="color: #111827; font-size: 24px; font-weight: 600; margin-top: 0; margin-bottom: 20px;">Reset Your Password</h1>
				<p style="color: #374151; font-size: 16px; margin-bottom: 12px;">Hi ${safeName},</p>
				<p style="color: #374151; font-size: 16px; margin-bottom: 24px; line-height: 1.5;">Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.</p>
				
				<div style="margin-bottom: 32px;">
					<a href="${resetLink}" style="background-color: #7F00FF; color: #ffffff; display: inline-block; padding: 14px 28px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 6px; text-align: center;">Reset Password</a>
				</div>
				
				<p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">If that doesn't work, copy and paste the following link in your browser:</p>
				<p style="margin-bottom: 32px; word-break: break-all;"><a href="${resetLink}" style="color: #7F00FF; text-decoration: underline;">${resetLink}</a></p>
				
				<p style="color: #374151; font-size: 16px; margin-bottom: 0;">The HybornCV Team.</p>
			</div>
			<p style="color: #9ca3af; font-size: 12px; margin-top: 30px; text-align: center;">You received this email because we received a request for password reset for your account.</p>
		</div>
		`
	});
}
