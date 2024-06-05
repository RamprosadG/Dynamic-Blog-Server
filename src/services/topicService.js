const DB = require("../configs/dbConfig");

const createTopicDB = async (data) => {
  try {
    const res = await DB.topic.create({
      data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOneTopicByNameDB = async (name) => {
  try {
    const res = await DB.topic.findUnique({ where: { name } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOneTopicByIdDB = async (id) => {
  try {
    const res = await DB.topic.findUnique({ where: { id } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllTopicDB = async () => {
  try {
    const res = await DB.topic.findMany();
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateTopicDB = async (id, updatedData) => {
  try {
    const data = await DB.topic.update({
      where: { id },
      data: updatedData,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteTopicDB = async (id) => {
  try {
    const res = await DB.topic.delete({ where: { id } });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getTopicForTableDB = async (data) => {
  try {
    const { search, sortCol, sortDir } = data;
    const row = parseInt(data.row);
    const page = parseInt(data.page);
    const offSet = parseInt(row * (page - 1));
    let orderCondition = undefined;

    if (sortCol === "name") {
      orderCondition = { [sortCol]: sortDir };
    } else if (sortCol) {
      orderCondition = { blogs: { _count: sortDir } };
    }

    const result = await DB.topic.findMany({
      where: {
        AND: [
          search && {
            name: {
              contains: search.toLowerCase(),
              mode: "insensitive",
            },
          },
        ].filter(Boolean),
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            blogs: true,
          },
        },
      },
      orderBy: orderCondition,
      take: row,
      skip: offSet,
    });

    const topicTableData = result?.map((item) => ({
      id: item.id,
      name: item.name,
      numberOfBlog: item._count.blogs,
    }));

    return topicTableData;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTotalRowsForTopicTableDB = async (data) => {
  try {
    const { search } = data;

    const result = await DB.topic.count({
      where: {
        AND: [
          search && {
            name: {
              contains: search.toLowerCase(),
              mode: "insensitive",
            },
          },
        ].filter(Boolean),
      },
    });

    return result;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

module.exports = {
  createTopicDB,
  getOneTopicByIdDB,
  getOneTopicByNameDB,
  getAllTopicDB,
  updateTopicDB,
  deleteTopicDB,
  getTopicForTableDB,
  getTotalRowsForTopicTableDB,
};
