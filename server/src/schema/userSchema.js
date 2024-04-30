const z = require("zod");

const createUserSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});

module.exports = createUserSchema;
