const {
  getOneTopicByIdDB,
  getTopicForTableDB,
  getTotalRowsForTopicTableDB,
  getOneTopicByNameDB,
  createTopicDB,
  updateTopicDB,
  deleteTopicDB,
  getAllTopicDB,
} = require("../models/topicModel");

const createTopic = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.json({ message: "Name is required.", success: false });
  }
  const topic = await getOneTopicByNameDB(name);

  if (topic) {
    return res.json({ message: "Topic already exists.", success: false });
  }
  const result = await createTopicDB(req.body);

  if (!result) {
    return res.json({ message: "Something went wrong.", success: false });
  }
  res.json({ message: "Topic is created successfully.", success: true });
};

const getOneTopicById = async (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    return res.json({ message: "Id is required.", success: false });
  }
  const result = await getOneTopicByIdDB(id);

  if (!result) {
    return res.json({ message: "Something went wrong.", success: false });
  }

  res.json({
    data: result,
    success: true,
  });
};

const getAllTopic = async (req, res) => {
  const result = await getAllTopicDB();

  if (!result) {
    return res.json({ message: "Something went wrong.", success: false });
  }

  res.json({
    message: "All topic are found successfully.",
    data: result,
    success: true,
  });
};

const updateTopic = async (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    return res.json({ message: "Id is required.", success: false });
  }
  const result = await updateTopicDB(id, req.body);

  if (!result) {
    return res.json({ message: "Something went wrong.", success: false });
  }
  res.json({ message: "Topic is updated successfully.", success: true });
};

const deleteTopic = async (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    return res.json({ message: "Id is required.", success: false });
  }
  const result = await deleteTopicDB(id);

  if (!result) {
    return res.json({ message: "Something went wrong.", success: false });
  }
  res.json({ message: "Topic is deleted successfully.", success: true });
};

const getTopicForTable = async (req, res) => {
  const data = await getTopicForTableDB(req.query);
  const totalRowsForTopicTable = await getTotalRowsForTopicTableDB(req.query);
  res.json({ data: data, totalRows: totalRowsForTopicTable, success: true });
};

module.exports = {
  createTopic,
  getOneTopicById,
  getAllTopic,
  updateTopic,
  deleteTopic,
  getTopicForTable,
};
