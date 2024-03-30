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
    return false;
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
      return false;
    }
    const blogTitle = result.rows[0].title;
    return blogTitle;
  } catch (err) {
    return false;
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
      return false;
    }
    const blogDescription = result.rows[0].description;
    return blogDescription;
  } catch (err) {
    return false;
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

exports.getBlogInfoForTable = async (data) => {
  const sql = new Client(postgresql);
  const search = data.search.toLowerCase();
  const sortCol = data.sortCol;
  const sortDir = data.sortDir;
  const topic = data.topic;
  const startDate = data.startDate;
  const endDate = data.endDate;
  const status = data.status;
  const row = data.row;
  const offSet = row * (data.page - 1);

  let query = ` SELECT
                blog.id AS id,
                blog.title AS title,
                blog.date AS date,
                blog.publish_date AS publish_date,
                CASE WHEN blog.status = 'true' THEN 'Published'
                ELSE 'Not published' END AS status,
                users.username AS author,
                topic.name as topic
                FROM public.blog
                LEFT JOIN public.users ON users.id = blog.user_id
                LEFT JOIN public.topic ON topic.id = blog.topic_id `;

  const filters = [];

  if (search) {
    filters.push(` (LOWER(blog.title) LIKE '%${search}%'
                  OR LOWER(topic.name) LIKE '%${search}%' OR LOWER(users.username) LIKE '%${search}%') `);
  }

  if (status) {
    filters.push(` blog.status = ${status} `);
  }
  if (topic) {
    filters.push(` topic.id = ${topic} `);
  }
  if (startDate) {
    filters.push(` blog.date >= '${startDate}' `);
  }
  if (endDate) {
    filters.push(` blog.date <= '${endDate}' `);
  }

  let filtersString = "";

  filters.map((item, index) => {
    filtersString += index > 0 ? ` AND ` : ` `;
    filtersString += item;
  });

  if (filtersString) query += ` WHERE ${filtersString} `;

  if (sortCol) {
    query += ` ORDER BY ${sortCol} ${sortDir} `;
  }

  query += ` LIMIT ${row} OFFSET ${offSet} `;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    return result.rows;
  } catch (err) {
    return false;
  }
};
