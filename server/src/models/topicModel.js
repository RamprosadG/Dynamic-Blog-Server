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
