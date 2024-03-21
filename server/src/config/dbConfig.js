require('dotenv').config();

const postgresql = {
    user: process.env.USER_NAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT
  };

  module.exports =  postgresql;