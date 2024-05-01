import { z } from 'zod';

export const LocationFormFieldsSchema = z.object({
	name: z.string().min(1).max(50)
});

export type LocationFormFields = z.infer<typeof LocationFormFieldsSchema>;
