const {
  getOneTopicByIdDB,
  getTopicForTableDB,
  getTotalRowsForTopicTableDB,
  getOneTopicByNameDB,
  createTopicDB,
  updateTopicDB,
  deleteTopicDB,
  getAllTopicDB,
} = require("../services/topicService");

const createTopic = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const getOneTopicById = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const getAllTopic = async (req, res) => {
  try {
    const result = await getAllTopicDB();

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }

    res.json({
      message: "All topic are found successfully.",
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const updateTopic = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await updateTopicDB(id, req.body);

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }
    res.json({ message: "Topic is updated successfully.", success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const result = await deleteTopicDB(id);

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }
    res.json({ message: "Topic is deleted successfully.", success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const getTopicForTable = async (req, res) => {
  try {
    const data = await getTopicForTableDB(req.query);
    const totalRowsForTopicTable = await getTotalRowsForTopicTableDB(req.query);
    res.json({ data: data, totalRows: totalRowsForTopicTable, success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

module.exports = {
  createTopic,
  getOneTopicById,
  getAllTopic,
  updateTopic,
  deleteTopic,
  getTopicForTable,
};
