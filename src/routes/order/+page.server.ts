import { superValidate } from 'sveltekit-superforms/server';
import { orderSchema } from '$lib/schema';
import type { PageServerLoad, Actions } from './$types';
import { pb } from '$lib/pocketbase';
import { zod } from "sveltekit-superforms/adapters";
import { fail } from '@sveltejs/kit';

// const pb = new PocketBase('http://127.0.0.1:8090');

export const load = (async () => {
    const form = await superValidate(
        { 
            services: {},
            status: 'pending',
        }, 
        zod(orderSchema)
    );
    
    return { form };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            const form = await superValidate(formData, zod(orderSchema));

            if (!form.valid) {
                return fail(400, { form });
            }

            // Create initial record without files
            const initialData = new FormData();
            for (const [key, value] of formData.entries()) {
                if (key !== 'documents') {
                    initialData.append(key, value);
                }
            }
                  
            // Handle optional fields
            Object.entries(form.data).forEach(([key, value]) => {
                if (key !== 'documents') {
                    if (value !== null && value !== undefined) {
                        if (key === 'services') {
                            initialData.append(key, JSON.stringify(value));
                        } else {
                            initialData.append(key, value as string);
                        }
                    }
                }
            });

            // Create the initial record
            const order = await pb.collection('orders').create(initialData);

            // Handle multiple files
            const files = formData.getAll('documents');
            for (const file of files) {
                if (file instanceof File) {
                    // Append each file using the "+ operator"
                    await pb.collection('orders').update(order.id, {
                        "documents+": file
                    });
                }
            }

            // // Fetch the updated record
            // const updatedOrder = await pb.collection('orders').getOne(order.id);

            // return {
            //     form: {
            //         ...form,
            //         data: {
            //             ...form.data,
            //             documents: files.map(file => ({
            //                 name: file.name,
            //                 size: file.size,
            //                 type: file.type
            //             }))
            //         }
            //     },
            //     success: true,
            //     orderId: updatedOrder.id
            // };

        } catch (error) {
            console.error('Form submission error:', error);
            return fail(500, {
                // form,
                error: error instanceof Error ? error.message : 'An unexpected error occurred'
            });
        }
    }
} satisfies Actions;