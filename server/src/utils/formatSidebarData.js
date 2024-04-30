const formatSidebarData = async (data) => {
  const dictionary = {};

  data?.map((item) => {
    if (!dictionary[item.topic]) {
      dictionary[item.topic] = [];
    }
    dictionary[item.topic].push({ id: item.id, label: item.blog });
  });
  const keys = Object.keys(dictionary);
  const formattedData = [];

  keys?.map((item) => {
    formattedData.push({ id: item, label: item, children: dictionary[item] });
  });
  return formattedData;
};

module.exports = {
  formatSidebarData,
};
