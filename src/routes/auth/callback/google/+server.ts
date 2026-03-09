import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals, cookies }) => {
    const providerRaw = cookies.get('provider');
    if (!providerRaw) {
        throw redirect(303, '/auth?error=Session+expired,+try+again');
    }

    const provider = JSON.parse(providerRaw);
    const state = url.searchParams.get('state');
    const code = url.searchParams.get('code');

    // Verify state to prevent CSRF attacks
    if (!state || !code || provider.state !== state) {
        throw redirect(303, '/auth?error=Authentication+failed');
    }

    try {
        // Exchange the code for a PocketBase auth session.
        // PocketBase automatically creates a new user if one with this Google email doesn't exist.
        // The 5th argument provides fallback data for required custom fields during first-time sign-up.
        await locals.pb.collection('users').authWithOAuth2Code(
            provider.name,         // 'google'
            code,                   // from Google callback
            provider.codeVerifier,  // the PKCE verifier saved in cookie
            provider.redirectUrl,   // the exact redirect URL used when initiating the flow
            {
                // Fallback values for custom required fields.
                // PocketBase will use Google's profile data where possible (email, avatar).
                // fullname will be filled from Google's display name via @oauth2Name token in PocketBase,
                // but we also pass it here as a safety fallback.
                fullname: '',
                location: '',
                phone: ''
            }
        );
    } catch (err) {
        console.error('OAuth2 callback error:', err);
        throw redirect(303, '/auth?error=Google+sign-in+failed');
    }

    // Clean up the provider cookie
    cookies.delete('provider', { path: '/' });

    // Redirect to customer dashboard on success
    throw redirect(303, '/customer');
};
