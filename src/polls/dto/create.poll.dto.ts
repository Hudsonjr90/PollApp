import { z } from 'zod';

export const CreatePollSchema = z.object({
  question: z.string().min(5),
  startAt: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), { message: 'Invalid date' }),
  endAt: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), { message: 'Invalid date' }),
  options: z.array(z.string().min(1)).min(3),
});

export type CreatePollDto = z.infer<typeof CreatePollSchema>;
