const { Client } = require("pg");
const postgresql = require("../config/dbConfig");

exports.findOneUserByemail = async (email) => {
  const sql = new Client(postgresql);
  const query = `SELECT username, password FROM public.users WHERE email = '${email}' LIMIT 1`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();

    if (!result.rows.length) {
      return null;
    }
    const user = result.rows[0];
    return user;
  } catch (err) {
    return null;
  }
};

exports.findOneUserByUserName = async (userName) => {
  const sql = new Client(postgresql);
  const query = `SELECT username FROM public.users WHERE username = '${userName}' LIMIT 1`;

  try {
    await sql.connect();
    const result = await sql.query(query);
    await sql.end();

    if (!result.rows.length) {
      return null;
    }
    const user = result.rows[0];
    return user;
  } catch (err) {
    return null;
  }
};

exports.registerNewUser = async (data, hashedPassword) => {
  const userName = data.userName;
  const email = data.email;

  const sql = new Client(postgresql);
  const query = `INSERT INTO public.users (username, email, password, role) 
             VALUES ('${userName}', '${email}', '${hashedPassword}', 'General')`;

  try {
    await sql.connect();
    await sql.query(query);
    await sql.end();
    return true;
  } catch (err) {
    return false;
  }
};
