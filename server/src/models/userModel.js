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
  const firstName = data.firstName;
  const lastName = data.lastName;

  const sql = new Client(postgresql);
  const query = `INSERT INTO public.users (username, email, first_name, last_name, password, role) 
             VALUES ('${userName}', '${email}', '${firstName}', '${lastName}', '${hashedPassword}', 'General')`;

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
