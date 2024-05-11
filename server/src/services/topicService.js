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
    const { search, sortCol, sortDir, row, page } = data;
    const offSet = row * (page - 1);

    const result = await DB.topic.findMany({
      where: {
        name: {
          contains: search.toLowerCase(),
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        blogs: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            blogs: true,
          },
        },
      },
      orderBy:
        sortCol === "name" ? { name: sortDir } : { blogs: { _count: sortDir } },
      take: row,
      skip: offSet,
    });

    return result;
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
        name: {
          contains: search.toLowerCase(),
          mode: "insensitive",
        },
      },
    });

    return { totalRows: result };
  } catch (err) {
    console.error(err);
    return { totalRows: 0 };
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
