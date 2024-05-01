import { z } from 'zod';

export const ItemFormFieldsSchema = z.object({
	name: z.string().min(2),
	type: z.string().nullable(),
	tags: z.array(z.string()),
	boughtAt: z.date(),
	openedAt: z.date().nullable(),
	expiresAt: z.date().nullable(),
	lifespan: z.number().min(0).nullable(),
	price: z.number().min(0).nullable(),
	locationId: z.string().nullable()
});

export type ItemFormFields = z.infer<typeof ItemFormFieldsSchema>;
