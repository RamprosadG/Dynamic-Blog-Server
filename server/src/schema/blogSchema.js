const z = require("zod");

const createBlogSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    topicId: z.string(),
  }),
});

const updateBlogSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    topicId: z.string(),
  }),
});

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};
