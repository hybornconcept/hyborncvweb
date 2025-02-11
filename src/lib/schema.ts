import { z } from 'zod';
import type { ZodSchema } from 'zod';

// Define the schema for step 1
const step1Schema = z.object({
    careerlevel: z.string().min(1, "Career level is required"),
    interest: z.string().min(1, "Interest is required"),
    others: z.string().optional(),
    package: z.string().min(1, "Package is required"),
    services: z.record(z.string(), z.boolean()).optional(),
    deadline: z.string().min(1, "Deadline is required")
});

// Define the schema for step 2
const step2Schema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    phone: z.string().min(1, "Phone number is required"),
    comments: z.string().optional(),
    documents: z.array(z.instanceof(File)).optional()
});

// Complete order schema combining both steps
export const orderSchema: ZodSchema = z.object({
    ...step1Schema.shape,
    ...step2Schema.shape
});

// Type for the complete schema
export type OrderSchema = z.infer<typeof orderSchema>;

// Validation functions for each step
export function validateStep1(data: Partial<OrderSchema>) {
    return step1Schema.safeParse(data);
}

export function validateStep2(data: Partial<OrderSchema>) {
    return step2Schema.safeParse(data);
}