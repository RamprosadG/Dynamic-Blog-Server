const { Client } = require("pg");
const postgresql = require("../config/dbConfig");

exports.getBlogById = async (id) => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public."Blog" WHERE "Id" = '${id}'`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    return result.rows;
  } catch (err) {
    return null;
  }
};

exports.getBlogTitle = async (title) => {
  const sql = new Client(postgresql);
  const query = `SELECT "Title" FROM public."Blog" WHERE "Title" = '${title}'`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    if (!result.rows.length) {
      return null;
    }
    const blogTitle = result.rows[0]["Title"];
    return blogTitle;
  } catch (err) {
    return null;
  }
};

exports.getBlogDescription = async (description) => {
  const sql = new Client(postgresql);
  const query = `SELECT "Description" FROM public."Blog" WHERE "Description" = '${description}'`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    if (!result.rows.length) {
      return null;
    }
    const blogDescription = result.rows[0]["Description"];
    return blogDescription;
  } catch (err) {
    return null;
  }
};

exports.addNewBlog = async (data) => {
  const sql = new Client(postgresql);
  const title = data["title"];
  const description = data["description"];
  const userId = data["userId"];
  const topicId = data["topicId"];
  const publishDate = data["publishDate"];

  const query = `INSERT INTO public."Blog" ("Title", "Description", "PublishDate", "UserId", "TopicId") VALUES ('${title}', '${description}', '${publishDate}', '${userId}', '${topicId}')`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

exports.updateExistingBlog = async (data) => {
  const sql = new Client(postgresql);
  const title = data["title"];
  const description = data["description"];
  const userId = data["userId"];
  const topicId = data["topicId"];
  const publishDate = data["publishDate"];

  const query = `UPDATE public."Blog" SET "Title" = '${title}', "Description" = '${description}', "TopicId" = '${topicId}' WHERE "Id" = '${id}'`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteExistingBlog = async (data) => {
  const sql = new Client(postgresql);
  const id = data["id"];
  const query = `DELETE FROM public."Topic" WHERE "Id" = '${id}'`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};
