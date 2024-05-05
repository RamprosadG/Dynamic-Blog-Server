const { Client } = require("pg");
const postgresql = require("../configs/dbConfig");

const createUserDB = async (data, hashedPassword) => {
  const { username, email } = data;

  const sql = new Client(postgresql);
  const query = `INSERT INTO public.users (username, email, password, role) 
             VALUES ('${username}', '${email}', '${hashedPassword}', 'General')`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};

const getOneUserByEmailDB = async (email) => {
  const sql = new Client(postgresql);
  const query = `SELECT * FROM public.users WHERE email = '${email}'`;

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

module.exports = {
  createUserDB,
  getOneUserByEmailDB,
};
