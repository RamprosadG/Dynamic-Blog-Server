const { Client } = require("pg");
const postgresql = require("../config/dbConfig");

const getUsers = async (req, res) => {
  data = [
    { id: "1", name: "ram", email: "ram@gmail.com" },
    { id: "2", name: "ram", email: "ram@gmail.com" },
    { id: "3", name: "ram", email: "ram@gmail.com" },
    { id: "4", name: "ram", email: "ram@gmail.com" },
    { id: "5", name: "ram", email: "ram@gmail.com" },
    { id: "6", name: "ram", email: "ram@gmail.com" },
    { id: "7", name: "ram", email: "ram@gmail.com" },
    { id: "8", name: "ram", email: "ram@gmail.com" },
  ];
  res.status(200).json(data);
};

module.exports = getUsers;
