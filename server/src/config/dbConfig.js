const {
  USER_NAME,
  HOST,
  DATABASE,
  PASSWORD,
  DATABASE_PORT,
} = require("./config");

const postgresql = {
  user: USER_NAME,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: DATABASE_PORT,
};

module.exports = postgresql;
