const { Client } = require("pg");
const postgresql = require("../config/dbConfig");

const createBlogDB = async (data) => {
  const sql = new Client(postgresql);
  const { title, description, userId, topicId } = data;
  const date = new Date().toISOString();
  const publishDate = new Date().toISOString();
  const status = false;

  const query = `INSERT INTO public.blog (title, description, publish_date, user_id, topic_id,
                  date, status) VALUES ('${title}', '${description}', '${publishDate}',
                  '${userId}', '${topicId}', '${date}', ${status})`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

const getOneBlogByIdDB = async (id) => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.blog WHERE id = '${id}'`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();

    if (!result || !result.rows.length) {
      return false;
    }
    return result.rows[0];
  } catch (err) {
    return false;
  }
};

const getOneBlogByTitleDB = async (title) => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.blog WHERE title = '${title}'`;

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

const getAllBlogDB = async () => {
  const query = `SELECT title, publish_date, user_id, topic_id, date, status FROM public.blog`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();

    if (!result || !result.rows.length) {
      return false;
    }
    return data.rows;
  } catch (err) {
    return false;
  }
};

const updateBlogDB = async (id, data) => {
  const sql = new Client(postgresql);
  const { title, description, topicId } = data;

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

const deleteBlogDB = async (id) => {
  const sql = new Client(postgresql);
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

const getBlogForTableDB = async (data) => {
  const sql = new Client(postgresql);
  const search = data.search?.toLowerCase();
  const { sortCol, sortDir, topic, startDate, endDate, status, row } = data;
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

const getTotalRowsForBlogTableDB = async (data) => {
  const sql = new Client(postgresql);
  const search = data.search.toLowerCase();
  const topic = data.topic;
  const startDate = data.startDate;
  const endDate = data.endDate;
  const status = data.status;

  let query = ` SELECT
                COUNT(blog.id) AS totalRows
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

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    return result.rows[0];
  } catch (err) {
    return 0;
  }
};

const getSidebarDataDB = async (data) => {
  const search = data?.search?.toLowerCase();
  const sql = new Client(postgresql);
  let query = ` SELECT
                blog.id AS id,
                blog.title AS blog,
                topic.name AS topic
                FROM public.blog
                LEFT JOIN public.topic ON topic.id = blog.topic_id `;

  if (search) {
    query += ` WHERE LOWER(blog.title) LIKE '%${search}%' `;
  }

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    return result.rows;
  } catch (err) {
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
