const { getSidebarDataDB } = require("../models/blogModel");
const { formatSidebarData } = require("../utils/formatSidebarData");

const getSidebarData = async (req, res) => {
  const result = await getSidebarDataDB(req.query);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  const sidebarData = await formatSidebarData(result);

  res.json({
    message: "Fetched the sidebar data successfully.",
    data: sidebarData,
    success: true,
  });
};

module.exports = {
  getSidebarData,
};
