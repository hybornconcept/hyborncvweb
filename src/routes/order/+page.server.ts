import { superValidate } from 'sveltekit-superforms/server';
import { orderSchema } from '$lib/schema';
import { additional } from '$lib';
import type { PageServerLoad, Actions } from './$types';
import { pb } from '$lib/pocketbase';
import { zod } from "sveltekit-superforms/adapters";
import { fail } from '@sveltejs/kit';

// const pb = new PocketBase('http://127.0.0.1:8090');

export const load = (async () => {
    const form = await superValidate(zod(orderSchema), { errors: false });

    // Set default values without triggering validation errors
    form.data.services = {};
    form.data.status = 'pending';

    return { form };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const form = await superValidate(formData, zod(orderSchema));

        if (!form.valid) {
            form.data.documents = []; // Clear files for serialization
            return fail(400, { form });
        }

        try {
            // 1. Prepare additional services with labels and prices for JSON storage
            const selectedServices = Object.entries(form.data.services || {})
                .filter(([_, checked]) => checked)
                .map(([id]) => {
                    const service = additional.find((s) => s.id === id);
                    return {
                        id,
                        label: service?.label || id,
                        price: service?.price || 0
                    };
                });

            // 2. Prepare FormData for PocketBase
            const pbData = new FormData();
            pbData.append('Job_Title', form.data.jobtitle);
            pbData.append('Career_Level', form.data.careerlevel);
            pbData.append('Package', form.data.package);
            pbData.append('Additional_Services', JSON.stringify(selectedServices));

            // Format deadline for PocketBase (if it's a date string like '2024-03-08')
            // PocketBase likes '2024-03-08 00:00:00.000Z'
            const deadline = form.data.deadline;
            pbData.append('Deadline', deadline.includes('T') ? deadline : `${deadline} 12:00:00.000Z`);

            pbData.append('fullname', form.data.fullname);
            pbData.append('phone', form.data.phone);
            pbData.append('Additional_comments', form.data.comments || '');
            pbData.append('job_link', form.data.joblink || '');

            // 3. Handle multiple file uploads
            const files = formData.getAll('documents');
            for (const file of files) {
                if (file instanceof File && file.size > 0) {
                    pbData.append('documents', file);
                }
            }

            // 4. Create the record in PocketBase
            const record = await pb.collection('orders').create(pbData);

            form.data.documents = []; // Clear files for serialization
            return {
                form,
                success: true,
                record
            };
        } catch (error) {
            console.error('Expert PB Submission Error:', error);
            form.data.documents = []; // Clear files for serialization
            return fail(500, {
                form,
                error: error instanceof Error ? error.message : 'An unexpected error occurred during order creation'
            });
        }
    }
} satisfies Actions;