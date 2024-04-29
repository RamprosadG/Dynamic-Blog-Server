const zod = require("zod");

const userSchema = zod.object({
  body: zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
  }),
});

module.exports = userSchema;
