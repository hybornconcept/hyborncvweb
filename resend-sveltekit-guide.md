# Resend Email Setup Guide for SvelteKit

A complete guide to adding transactional email functionality (password reset, notifications, welcome emails) to your SvelteKit project using Resend.

---

## Step 1 — Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Click **Sign Up** and register with your Gmail
3. Verify your email address

---

## Step 2 — Add Your Domain in Resend

1. In the Resend dashboard, click **Domains → Add Domain**
2. Enter `hyborncv.com`
3. Select region **EU** (closest to Nigeria)
4. Click **Add**

Resend will provide DNS records similar to:

| Type  | Name                        | Value                                          |
|-------|-----------------------------|------------------------------------------------|
| MX    | `send`                      | `feedback-smtp.eu-west-1.amazonses.com`        |
| TXT   | `resend._domainkey`         | `p=MIGf...`                                    |
| TXT   | `send`                      | `v=spf1 include:amazonses.com ~all`            |

---

## Step 3 — Add DNS Records in Cloudflare

1. Go to **Cloudflare → DNS → Add record**
2. Add each record from Resend exactly as shown
3. Go back to Resend and click **Verify DNS Records**
4. Wait for ✅ green status on all records

---

## Step 4 — Get Your API Key

1. In Resend dashboard, go to **API Keys → Create API Key**
2. Name it `hyborncv-production`
3. Set permission to **Sending access**
4. Click **Add**
5. **Copy the key immediately** — it is only shown once!

---

## Step 5 — Install Resend in Your SvelteKit Project

```bash
npm install resend
```

---

## Step 6 — Add API Key to Environment Variables

In your project root, open or create `.env`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

Then add it to **Vercel → Settings → Environment Variables**:

- **Key:** `RESEND_API_KEY`
- **Value:** your key from Resend
- **Environment:** Production, Preview, Development ✅

> ⚠️ Make sure `.env` is in your `.gitignore` so the key is never pushed to GitHub.

---

## Step 7 — Create Email Templates

Create `src/lib/server/email.ts`:

```ts
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

// Password reset email
export async function sendPasswordReset(to: string, name: string, resetLink: string) {
  await resend.emails.send({
    from: 'HybornCV <info@hyborncv.com>',
    to,
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>We received a request to reset your password.</p>
        <a href="${resetLink}" 
           style="background: #7c3aed; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          Reset Password
        </a>
        <p>This link expires in <strong>1 hour</strong>.</p>
        <p>If you didn't request this, ignore this email.</p>
      </div>
    `
  });
}

// Welcome email
export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'HybornCV <info@hyborncv.com>',
    to,
    subject: 'Welcome to HybornCV! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome, ${name}! 🎉</h2>
        <p>Your account has been created successfully.</p>
        <a href="https://hyborncv.com/dashboard" 
           style="background: #7c3aed; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          Get Started
        </a>
      </div>
    `
  });
}

// General notification email
export async function sendNotification(to: string, name: string, message: string) {
  await resend.emails.send({
    from: 'HybornCV <info@hyborncv.com>',
    to,
    subject: 'Notification from HybornCV',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>${message}</p>
      </div>
    `
  });
}
```

---

## Step 8 — Create API Routes

### Welcome Email Route

Create `src/routes/api/send-welcome/+server.ts`:

```ts
import { json } from '@sveltejs/kit';
import { sendWelcomeEmail } from '$lib/server/email';

export async function POST({ request }) {
  const { email, name } = await request.json();

  try {
    await sendWelcomeEmail(email, name);
    return json({ success: true });
  } catch (error) {
    return json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
```

### Password Reset Route

Create `src/routes/api/reset-password/+server.ts`:

```ts
import { json } from '@sveltejs/kit';
import { sendPasswordReset } from '$lib/server/email';

export async function POST({ request }) {
  const { email, name, resetLink } = await request.json();

  try {
    await sendPasswordReset(email, name, resetLink);
    return json({ success: true });
  } catch (error) {
    return json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
```

---

## Step 9 — Call Emails from Your App

Use these anywhere in your SvelteKit code:

```ts
// Send welcome email after registration
await fetch('/api/send-welcome', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: user.email, name: user.name })
});

// Send password reset email
await fetch('/api/reset-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: user.email,
    name: user.name,
    resetLink: `https://hyborncv.com/reset?token=${token}`
  })
});
```

---

## Step 10 — Test It

1. Run your app locally:
   ```bash
   npm run dev
   ```
2. Trigger a registration or password reset flow
3. Check the recipient's inbox for the email

---

## Important Notes

- Always import email functions from `$lib/server/email` — the `server` folder ensures they **never run on the client**
- Never expose `RESEND_API_KEY` in client-side code
- Add `.env` to your `.gitignore` so the key is never pushed to GitHub
- Free tier includes **3,000 emails/month** — more than enough to get started
