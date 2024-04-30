const z = require("zod");

const createTopicSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

const updateTopicSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

module.exports = {
  createTopicSchema,
  updateTopicSchema,
};
