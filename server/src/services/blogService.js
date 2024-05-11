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
    const {
      search,
      sortCol,
      sortDir,
      topic,
      startDate,
      endDate,
      status,
      row,
      page,
    } = data;
    const offSet = row * (page - 1);

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
          status !== undefined && { status: status },
          topic && { topicId: topic },
          startDate && { date: { gte: new Date(startDate) } },
          endDate && { date: { lte: new Date(endDate) } },
        ].filter(Boolean),
      },
      select: {
        id: true,
        title: true,
        date: true,
        publish_date: true,
        status: true,
        user: { select: { username: true } },
        topic: { select: { name: true } },
      },
      orderBy: sortCol ? { [sortCol]: sortDir } : undefined,
      take: row,
      skip: offSet,
    });

    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTotalRowsForBlogTableDB = async (data) => {
  try {
    const { search, topic, startDate, endDate, status } = data;

    const result = await DB.blog.count({
      where: {
        AND: [
          search && {
            OR: [
              {
                title: { contains: search.toLowerCase(), mode: "insensitive" },
              },
              {
                topic: {
                  name: { contains: search.toLowerCase(), mode: "insensitive" },
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
          status !== undefined && { status: status },
          topic && { topicId: topic },
          startDate && { date: { gte: new Date(startDate) } },
          endDate && { date: { lte: new Date(endDate) } },
        ].filter(Boolean),
      },
    });

    return { totalRows: result };
  } catch (err) {
    console.error(err);
    return { totalRows: 0 };
  }
};

const getSidebarDataDB = async (data) => {
  try {
    const { search } = data;

    const result = await DB.blog.findMany({
      where: {
        title: {
          contains: search ? search.toLowerCase() : "",
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        topic: { select: { name: true } },
      },
    });

    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    return false;
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
};
