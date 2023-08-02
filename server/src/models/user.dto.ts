import { z } from "zod";

export const UserSchema = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
    }),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export type UserInput = z.infer<typeof UserSchema>;
