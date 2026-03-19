import { z } from 'zod';
import type { ZodSchema } from 'zod';

// Define the schema for step 1
const step1Schema = z.object({
	fullname: z.string().min(1, 'Full name is required'),
	jobtitle: z.string().min(1, 'Job title is required'),
	careerlevel: z.string().min(1, 'Career level is required'),
	package: z.string().min(1, 'Package is required'),
	services: z.record(z.string(), z.boolean()).optional()
});

// Define the schema for step 2
const step2Schema = z.object({
	phone: z.string().min(11, 'Phone number must be at least 11 characters'),
	comments: z.string().optional(),
	joblink: z
		.union([
			z
				.string()
				.regex(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i, 'Please enter a valid URL'),
			z.literal('')
		])
		.optional(),
	documents: z.array(z.instanceof(File)).optional(),
	deadline: z.string().min(1, 'Deadline is required')
});

// Complete order schema combining both steps
export const orderSchema = z.object({
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

// --- Authentication Schemas ---

export const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
	password: z.string().min(1, 'Password is required')
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		fullname: z.string().min(1, 'Full name is required'),
		email: z.string().min(1, 'Email is required').email('Invalid email address'),
		location: z.string().min(1, 'Location is required'),
		phone: z.string().min(11, 'Phone number must be at least 11 characters'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		passwordConfirm: z.string().min(1, 'Please confirm your password')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ['passwordConfirm']
	});

export type RegisterSchema = z.infer<typeof registerSchema>;
