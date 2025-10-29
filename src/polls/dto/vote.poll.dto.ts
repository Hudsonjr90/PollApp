import { z } from 'zod';

export const VoteDtoSchema = z.object({
  optionId: z.string().uuid(),
});
export type VoteDto = z.infer<typeof VoteDtoSchema>;
