const { Client } = require('pg');
const postgresql = require('../config/dbConfig');

const getUsers = async (req, res) => {
    const sql = new Client(postgresql);
    const query = `SELECT * FROM "User"`;
    try {
        await sql.connect();
        const data = await sql.query(query);
        res.status(200).json(data.rows);
    }
    catch(err) {
        res.send("something wrong");
    }
}

module.exports = getUsers;