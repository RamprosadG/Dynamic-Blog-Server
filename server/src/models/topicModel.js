const { Client } = require("pg");
const postgresql = require("../config/dbConfig");

exports.getTopicById = async (id) => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.topic WHERE id = '${id}'`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    return result.rows;
  } catch (err) {
    return null;
  }
};

exports.allTopic = async () => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.topic`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    return result.rows;
  } catch (err) {
    return null;
  }
};

exports.getTopicName = async (name) => {
  const sql = new Client(postgresql);
  const query = `SELECT name FROM public.topic WHERE name = '${name}'`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();
    if (!result.rows.length) {
      return null;
    }
    const topicName = result.rows[0].name;
    return topicName;
  } catch (err) {
    return null;
  }
};

exports.addNewTopic = async (data) => {
  const sql = new Client(postgresql);
  const topicName = data.name;
  const query = `INSERT INTO public.topic (name) VALUES ('${topicName}')`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

exports.updateExistingTopic = async (data) => {
  const sql = new Client(postgresql);
  const id = data.id;
  const name = data.name;
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

exports.deleteExistingTopic = async (data) => {
  const sql = new Client(postgresql);
  const id = data.id;
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

exports.getTopicInfoForTable = async (data) => {
  const sql = new Client(postgresql);
  const search = data.search.toLowerCase();
  const sortCol = data.sortCol;
  const sortDir = data.sortDir;
  const row = data.row;
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
