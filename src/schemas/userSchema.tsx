import accountSchema from "./accountSchema";

const userSchema = accountSchema.omit({ password: true });

export default userSchema;
