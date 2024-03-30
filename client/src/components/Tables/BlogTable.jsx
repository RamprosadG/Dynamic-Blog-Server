import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import TopicDropdown from "../Dropdown/TopicDropdown";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableCustomStyles from "./TableCustomStyles";
import { Link } from "react-router-dom";

const BlogTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationTotalRows, setPaginationTotalRows] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [searchText, setSearchText] = useState("");
  const [topic, setTopic] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    paginationTotalRows,
    sortColumn,
    sortDirection,
    searchText,
    topic,
    startDate,
    endDate,
    status,
  ]);

  const fetchData = () => {
    try {
      setLoading(true);
      const formData = {
        page: currentPage,
        row: paginationTotalRows,
        sortCol: sortColumn,
        sortDir: sortDirection,
        search: searchText,
        startDate: startDate,
        endDate: endDate,
        topic: topic,
        status: status,
      };

      axios
        .get("http://localhost:5000/admin/getBlogsForTable", {
          params: formData,
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log("There is an error to fetch blogs");
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = async (newPerPage) => {
    setPaginationTotalRows(newPerPage);
  };

  const handleSort = (column, direction) => {
    setSortColumn(column.sortField);
    setSortDirection(direction);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteBlog = async (id) => {
    const formData = {
      id: id,
    };
    console.log(formData);
    await axios
      .delete("http://localhost:5000/admin/deleteBlog", {
        data: formData,
      })
      .then((response) => {
        alert(response.data.message);
        response.data.success && fetchData();
      })
      .catch(() => {
        console.log("server error");
      });
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
    {
      sortable: false,
      width: "100px",
      cell: (row) => {
        return (
          <div className="container ms-2">
            <div className="d-flex justify-content-start">
              <Link to="/blog/Update" state={{ id: row.id }}>
                <button type="button" className="btn btn-secondary, btn-sm">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-secondary, btn-sm"
                onClick={() => {
                  handleDeleteBlog(row.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-3">
          <Form.Label>Topic</Form.Label>
          <TopicDropdown updateTopic={handleTopicChange} value={topic} />
        </div>
        <div className="col-3">
          <Form.Label>Status</Form.Label>
          <select
            className="form-select"
            id="blog-table-status"
            onChange={handleStatusChange}
            value={status}
          >
            <option id="status" value="">
              Select status
            </option>
            <option id="published" value="true">
              Published
            </option>
            <option id="not-published" value="false">
              Not published
            </option>
          </select>
        </div>
        <div className="col-3">
          <Form>
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="datetime-local"
              id="blog-table-start-date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Form>
        </div>
        <div className="col-3">
          <Form>
            <Form.Label>End date</Form.Label>
            <Form.Control
              type="datetime-local"
              id="blog-table-end-date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Form>
        </div>
      </div>
      <div className="row mt-5 mb-2">
        <div className="col-3">
          <Form.Control
            type="search"
            id="blog-table-search"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            className="me-2"
            aria-label="Search"
          />
        </div>
      </div>
      <DataTable
        id="blog-table"
        striped={true}
        highlightOnHover={true}
        columns={columnsOfBlog}
        data={data}
        customStyles={TableCustomStyles}
        progressPending={loading}
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        sortServer
        onSort={handleSort}
      />
    </>
  );
};

export default BlogTable;
