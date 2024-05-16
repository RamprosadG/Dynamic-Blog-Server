const DB = require("../configs/dbConfig");

const createBlogDB = async (data) => {
  try {
    const res = await DB.blog.create({
      data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOneBlogByIdDB = async (id) => {
  try {
    const res = await DB.blog.findUnique({ where: { id } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOneBlogByTitleDB = async (title) => {
  try {
    const res = await DB.blog.findUnique({ where: { title } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllBlogDB = async () => {
  try {
    const res = await DB.blog.findMany();
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateBlogDB = async (id, updatedData) => {
  try {
    const data = await DB.blog.update({
      where: { id },
      data: updatedData,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteBlogDB = async (id) => {
  try {
    const res = await DB.blog.delete({ where: { id } });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getBlogForTableDB = async (data) => {
  try {
    const { search, sortCol, sortDir, topicId, startDate, endDate } = data;
    const status =
      data.status === "true" ? true : data.status === "false" ? false : null;
    console.log(status);
    const row = parseInt(data.row);
    const page = parseInt(data.page);
    const offSet = parseInt(row * (page - 1));
    let orderCondition = undefined;

    if (sortCol === "name") {
      orderCondition = { topic: { [sortCol]: sortDir } };
    } else if (sortCol === "username") {
      orderCondition = { user: { [sortCol]: sortDir } };
    } else if (sortCol) {
      orderCondition = { [sortCol]: sortDir };
    }

    const result = await DB.blog.findMany({
      where: {
        AND: [
          search && {
            OR: [
              {
                title: {
                  contains: search.toLowerCase(),
                  mode: "insensitive",
                },
              },
              {
                topic: {
                  name: {
                    contains: search.toLowerCase(),
                    mode: "insensitive",
                  },
                },
              },
              {
                user: {
                  username: {
                    contains: search.toLowerCase(),
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
          status !== null && { status: status },
          topicId && { topicId: topicId },
          startDate && { createdAt: { gte: new Date(startDate) } },
          endDate && { createdAt: { lte: new Date(endDate) } },
        ].filter(Boolean),
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        publishDate: true,
        status: true,
        user: { select: { username: true } },
        topic: { select: { name: true } },
      },
      orderBy: orderCondition,
      take: row,
      skip: offSet,
    });

    const blogTableData = result?.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.user.username,
      topic: item.topic.name,
      date: item.createdAt,
      publishDate: item.publishDate,
      status: item.status ? "Published" : "Not published",
    }));

    return blogTableData;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTotalRowsForBlogTableDB = async (data) => {
  try {
    const { search, topicId, startDate, endDate } = data;
    const status =
      data.status === "true" ? true : data.status === "false" ? false : null;
    const result = await DB.blog.count({
      where: {
        AND: [
          search && {
            OR: [
              {
                title: {
                  contains: search.toLowerCase(),
                  mode: "insensitive",
                },
              },
              {
                topic: {
                  name: {
                    contains: search.toLowerCase(),
                    mode: "insensitive",
                  },
                },
              },
              {
                user: {
                  username: {
                    contains: search.toLowerCase(),
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
          status !== null && { status: status },
          topicId && { topicId: topicId },
          startDate && { createdAt: { gte: new Date(startDate) } },
          endDate && { createdAt: { lte: new Date(endDate) } },
        ].filter(Boolean),
      },
    });

    return result;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const getSidebarDataDB = async (data) => {
  try {
    const { search } = data;

    const result = await DB.blog.findMany({
      where: {
        AND: [
          {
            status: true,
          },
          search && {
            title: {
              contains: search.toLowerCase(),
              mode: "insensitive",
            },
          },
        ].filter(Boolean),
      },
      select: {
        id: true,
        title: true,
        topic: { select: { name: true } },
      },
    });

    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getBlogForPaginationDB = async (data) => {
  try {
    const page = parseInt(data.page);
    const pageSize = parseInt(data.pageSize);
    const offSet = parseInt((page - 1) * pageSize);

    const result = await DB.blog.findMany({
      where: {
        status: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        publishDate: true,
        topic: { select: { name: true } },
        user: { select: { username: true } },
      },
      orderBy: { publishDate: "desc" },
      take: pageSize,
      skip: offSet,
    });

    const paginationData = result?.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      author: item.user.username,
      topic: item.topic.name,
      publishDate: item.publishDate,
    }));

    return paginationData;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getTotalPageForPaginationDB = async (data) => {
  const pageSize = parseInt(data.pageSize);
  try {
    const result = await DB.blog.count({
      where: {
        status: true,
      },
    });

    const totalPages = parseInt((parseInt(result) + pageSize - 1) / pageSize);
    return totalPages;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

module.exports = {
  createBlogDB,
  getOneBlogByIdDB,
  getOneBlogByTitleDB,
  getAllBlogDB,
  updateBlogDB,
  deleteBlogDB,
  getBlogForTableDB,
  getTotalRowsForBlogTableDB,
  getSidebarDataDB,
  getBlogForPaginationDB,
  getTotalPageForPaginationDB,
};
