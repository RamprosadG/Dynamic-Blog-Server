const { Client } = require('pg');
const postgresql = require('../config/dbConfig');

exports.getTopicById = async (id) => {
    const sql = new Client(postgresql);
    const query = `SELECT * FROM public."Topic" WHERE "Id" = '${id}'`;
    
    try {
        await sql.connect();
        const result = await sql.query(query);
        await sql.end();
        return result.rows;
    }
    catch(err) {
        return null;
    }
}

exports.getTopicName = async (name) => {
    const sql = new Client(postgresql);
    const query = `SELECT "Name" FROM public."Topic" WHERE "Name" = '${name}'`;
    
    try {
        await sql.connect();
        const result = await sql.query(query);
        await sql.end();
        if(!result.rows.length) {
            return null;
        }
        const topicName = result.rows[0]["Name"];
        return topicName;
    }
    catch(err) {
        return null;
    }
}

exports.addNewTopic = async (data) => {
    const sql = new Client(postgresql);
    const topicName = data["name"];
    const query = `INSERT INTO public."Topic" ("Name") VALUES ('${topicName}')`;
    
    try {
        await sql.connect();
        await sql.query(query);
        await sql.end();
        return true;
    }
    catch(err) {
        return false;
    }
}

exports.updateExistingTopic = async (data) => {
    const sql = new Client(postgresql);
    const id = data["id"];
    const name = data["name"];
    const query = `UPDATE public."Topic" SET "Name" = '${name}' WHERE "Id" = '${id}'`;
    
    try {
        await sql.connect();
        await sql.query(query);
        await sql.end();
        return true;
    }
    catch(err) {
        return false;
    }
}

exports.deleteExistingTopic = async (data) => {
    const sql = new Client(postgresql);
    const id = data["id"];
    const query = `DELETE FROM public."Topic" WHERE "Id" = '${id}'`;
    
    try {
        await sql.connect();
        await sql.query(query);
        await sql.end();
        return true;
    }
    catch(err) {
        return false;
    }
}
