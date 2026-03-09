import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, cookies, url }) => {
    const authMethods = await locals.pb.collection('users').listAuthMethods();

    // PocketBase SDK v0.21+ uses oauth2.providers; fallback for older versions
    const providers = authMethods?.oauth2?.providers ?? authMethods?.authProviders ?? [];

    const provider = providers.find((p: { name: string }) => p.name === 'google');
    if (!provider) {
        throw redirect(303, '/auth?error=Google+auth+not+configured+in+PocketBase');
    }

    // Build the callback URL — must exactly match what's in Google Cloud Console
    const redirectUrl = `${url.origin}/auth/callback/google`;

    // Store the provider info in a secure cookie for CSRF verification in the callback
    cookies.set('provider', JSON.stringify({ ...provider, redirectUrl }), {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: url.protocol === 'https:',
        maxAge: 60 * 10 // 10 minutes
    });

    // Redirect the browser to Google's consent screen
    throw redirect(302, provider.authURL + redirectUrl);
};
