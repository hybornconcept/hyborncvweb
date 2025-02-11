import type { SuperValidated } from 'sveltekit-superforms';
import type { OrderSchema } from '$lib/schema';

export interface PageData {
    form: SuperValidated<OrderSchema>;
} 