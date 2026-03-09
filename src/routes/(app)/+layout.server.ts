import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    // Protect all routes under (app)/ — redirect to login if not authenticated
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/auth');
    }

    // Pass the user data down to all child pages
    return {
        user: locals.user
    };
};
