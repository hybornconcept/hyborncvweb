import { z } from 'zod';
import type { ZodSchema } from 'zod';

// Define the schema for step 1
const step1Schema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    jobtitle: z.string().min(1, "Job title is required"),
    careerlevel: z.string().min(1, "Career level is required"),
    package: z.string().min(1, "Package is required"),
    services: z.record(z.string(), z.boolean()).optional(),
});

// Define the schema for step 2
const step2Schema = z.object({
    phone: z.string().min(11, "Phone number must be at least 11 characters"),
    comments: z.string().optional(),
    joblink: z.string().optional(),
    documents: z.array(z.instanceof(File)).optional(),
    deadline: z.string().min(1, "Deadline is required")
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