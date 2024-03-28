const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#d4d9d6",
    },
  },
  headCells: {
    style: {
      padding: "7px",
      color: "black",
      fontSize: "16px",
    },
  },
  rows: {
    style: {
      color: "black",
      fontSize: "14px",
      cursor: "pointer",
    },
  },
  cells: {
    style: {
      padding: "7px",
      color: "black",
      fontSize: "14px",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#e3e8e5",
    },
  },
};

const columnsOfBlog = [
  {
    name: "Title",
    sortField: "title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Topic",
    sortField: "topic",
    selector: (row) => row.topic,
    sortable: true,
  },
  {
    name: "Author",
    sortField: "author",
    selector: (row) => row.author,
    sortable: true,
  },
  {
    name: "Date",
    sortField: "date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "status",
    sortField: "status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Publish date",
    sortField: "publish_date",
    selector: (row) => row.publish_date,
    sortable: true,
  },
];

const columnsOfTopic = [
  {
    name: "Topic",
    sortField: "name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Number of Blog",
    sortField: "numberOfBlog",
    selector: (row) => row.numberofblog,
    sortable: true,
  },
];

export { customStyles, columnsOfBlog, columnsOfTopic };
