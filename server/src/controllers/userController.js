const { getSidebarDataDB } = require("../services/blogService");
const { formatSidebarData } = require("../utils/formatSidebarData");

const getSidebarData = async (req, res) => {
  try {
    const result = await getSidebarDataDB(req.query);

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }
    const sidebarData = await formatSidebarData(result);

    res.json({
      message: "Fetched the sidebar data successfully.",
      data: sidebarData,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

module.exports = {
  getSidebarData,
};
