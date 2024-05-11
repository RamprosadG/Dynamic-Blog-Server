const DB = require("../configs/dbConfig");

const createUserDB = async (data) => {
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

const getOneUserByEmailDB = async (email) => {
  try {
    const res = await DB.blog.findUnique({ where: { email } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  createUserDB,
  getOneUserByEmailDB,
};
