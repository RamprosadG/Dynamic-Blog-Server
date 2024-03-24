const { Client } = require("pg");
const postgresql = require("../config/dbConfig");

exports.getBlogById = async (id) => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.blog WHERE id = '${id}'`;

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
  const query = `SELECT title FROM public.blog WHERE title = '${title}'`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    if (!result.rows.length) {
      return null;
    }
    const blogTitle = result.rows[0].title;
    return blogTitle;
  } catch (err) {
    return null;
  }
};

exports.getBlogDescription = async (description) => {
  const sql = new Client(postgresql);
  const query = `SELECT description FROM public.blog WHERE description = '${description}'`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    if (!result.rows.length) {
      return null;
    }
    const blogDescription = result.rows[0].description;
    return blogDescription;
  } catch (err) {
    return null;
  }
};

exports.addNewBlog = async (data) => {
  console.log(data);
  const sql = new Client(postgresql);
  const title = data.title;
  const description = data.description;
  const userId = data.userId;
  const topicId = data.topicId;
  const date = data.date;
  const publishDate = data.publishDate;
  const status = data.status;

  const query = `INSERT INTO public.blog (title, description, publish_date, user_id, topic_id,
                  date, status) VALUES ('${title}', '${description}', '${publishDate}',
                  '${userId}', '${topicId}', '${date}', ${status})`;

  console.log(query);
  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

exports.allBlog = async () => {
  const query = `SELECT title, publish_date, user_id, topic_id, date, status FROM public.blog`;

  try {
    await sql.connect();
    const data = await sql.query(query);
    await sql.end();
    return data.rows;
  } catch (err) {
    return false;
  }
};

exports.updateExistingBlog = async (data) => {
  const sql = new Client(postgresql);
  const id = data.id;
  const title = data.title;
  const description = data.description;
  const topicId = data.topicId;

  const query = `UPDATE public.blog SET title = '${title}', description = '${description}', topic_id = '${topicId}' WHERE id = '${id}'`;

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
  const id = data.id;
  const query = `DELETE FROM public.blog WHERE id = '${id}'`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};
