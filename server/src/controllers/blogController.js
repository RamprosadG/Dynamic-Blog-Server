const {
  getOneBlogByTitleDB,
  createBlogDB,
  getOneBlogByIdDB,
  getAllBlogDB,
  updateBlogDB,
  deleteBlogDB,
  getBlogForTableDB,
  getTotalRowsForBlogTableDB,
} = require("../services/blogService");

const createBlog = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.json({ message: "Title is required.", success: false });
    }
    const blog = await getOneBlogByTitleDB(title);

    if (blog) {
      return res.json({ message: "Title already exists.", success: false });
    }

    const result = await createBlogDB(req.body);

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }
    res.json({ message: "Blog is created successfully.", success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const getOneBlogById = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await getOneBlogByIdDB(id);

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }

    res.json({
      message: "Blog is found successfully.",
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const result = await getAllBlogDB();

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }

    res.json({
      message: "All blogs are found successfully.",
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const updateBlog = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = updateBlogDB(id, req.body);

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }
    res.json({ message: "Blog is updated successfully.", success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteBlogDB(id);

    if (!result) {
      return res.json({ message: "Internal server error.", success: false });
    }
    res.json({ message: "The blog is deleted successfully.", success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const getBlogForTable = async (req, res) => {
  try {
    const data = await getBlogForTableDB(req.query);

    if (!data) {
      return res.json({ message: "Something went wrong.", success: false });
    }
    const totalRowsForBlogTable = await getTotalRowsForBlogTableDB(req.query);
    res.json({ data: data, totalRows: totalRowsForBlogTable, success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

module.exports = {
  createBlog,
  getOneBlogById,
  getAllBlog,
  updateBlog,
  deleteBlog,
  getBlogForTable,
};
