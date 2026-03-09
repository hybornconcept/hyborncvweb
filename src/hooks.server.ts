import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Create a NEW PocketBase instance per request (never share one across requests on the server)
    const pb = new PocketBase('https://hyborncvrepo.pockethost.io');

    // load the auth store from the request cookie string
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // Verify and refresh the loaded auth token (if any)
        if (pb.authStore.isValid) {
            await pb.collection('users').authRefresh();
        }
    } catch {
        // Token is expired or invalid — clear it
        pb.authStore.clear();
    }

    // Make the pb instance and user available throughout all server-side load/action functions
    event.locals.pb = pb;
    event.locals.user = structuredClone(pb.authStore.record);

    const response = await resolve(event);

    // Write the updated auth cookie back to the browser
    // httpOnly: false so the client-side PocketBase SDK can also read it
    response.headers.append('set-cookie', pb.authStore.exportToCookie({ httpOnly: false, secure: true, sameSite: 'Lax' }));

    return response;
};
