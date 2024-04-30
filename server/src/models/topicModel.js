const { Client } = require("pg");
const postgresql = require("../config/dbConfig");

const createTopicDB = async (data) => {
  const sql = new Client(postgresql);
  const { name } = data;
  const query = `INSERT INTO public.topic (name) VALUES ('${name}')`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

const getOneTopicByNameDB = async (name) => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.topic WHERE id = '${name}' LIMIT 1`;

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

const getOneTopicByIdDB = async (id) => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.topic WHERE id = '${id}' LIMIT 1`;

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

const getAllTopicDB = async () => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.topic`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    return result.rows;
  } catch (err) {
    return false;
  }
};

const updateTopicDB = async (id, data) => {
  const sql = new Client(postgresql);
  const { name } = data;
  const query = `UPDATE public.topic SET name = '${name}' WHERE id = '${id}'`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

const deleteTopicDB = async (id) => {
  const sql = new Client(postgresql);
  const query = `DELETE FROM public.topic WHERE id = '${id}'`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

const getTopicForTableDB = async (data) => {
  const sql = new Client(postgresql);
  const search = data.search.toLowerCase();
  const { sortCol, sortDir, row } = data;
  const offSet = row * (data.page - 1);

  let query = ` SELECT
                topic.id AS id,
                topic.name AS name,
                COUNT(blog.id) AS numberOfBlog
                FROM public.topic
                LEFT JOIN public.blog ON blog.topic_id = topic.id
                GROUP BY topic.name, topic.id `;

  if (search) {
    query += ` WHERE LOWER(topic.name) LIKE '%${search}%' `;
  }

  if (sortCol && sortCol === "name") {
    query += ` ORDER BY ${sortCol} ${sortDir} `;
  } else if (sortCol && sortCol === "numberOfBlog") {
    query += ` ORDER BY COUNT(blog.id) ${sortDir} `;
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

const getTotalRowsForTopicTableDB = async (data) => {
  const sql = new Client(postgresql);
  const search = data.search.toLowerCase();

  let query = ` SELECT
                COUNT(topic.id) AS totalRows
                FROM public.topic `;

  if (search) {
    query += ` WHERE LOWER(topic.name) LIKE '%${search}%' `;
  }

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    return result.rows[0];
  } catch (err) {
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
