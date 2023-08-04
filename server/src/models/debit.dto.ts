import {z} from "zod";

export const DebitSchema = z.object({
    amount: z.number({
        invalid_type_error: "Amount must be a number",
        required_error: "Amount is required",
    }),
    description: z.string().min(3),
    date: z.date(),
    user: z.string(),
});

export type DebitInput = z.infer<typeof DebitSchema>;