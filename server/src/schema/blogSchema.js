const z = require("zod");

const createBlogSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    userId: z.number(),
    topicId: z.number(),
  }),
});

const updateBlogSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    topicId: z.number(),
  }),
});

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};
