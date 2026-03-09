import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
    // Inherit user data from the (app) layout guard
    const { user } = await parent();

    return {
        user
    };
};