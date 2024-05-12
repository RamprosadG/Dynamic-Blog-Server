import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import TopicDropdown from "../Dropdown/TopicDropdown";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableCustomStyles from "./TableCustomStyles";
import { Link } from "react-router-dom";

const BlogTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
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
  }, [currentPage, paginationTotalRows, sortColumn, sortDirection, searchText]);

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
        .get("http://localhost:5000/api/admin/blog/table", {
          params: formData,
        })
        .then((response) => {
          if (response.data.success) {
            setData(response.data.data);
            setTotalRows(response.data.totalRows);
          }
          setLoading(false);
        });
    } catch (error) {
      console.log("Error to fetch blogs");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
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
    await axios
      .delete(`http://localhost:5000/api/admin/blog/remove/${id}`)
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
      sortField: "publishDate",
      selector: (row) => row.publishDate,
      sortable: true,
    },
    {
      sortable: false,
      width: "100px",
      cell: (row) => {
        return (
          <div className="container ms-2">
            <div className="d-flex justify-content-start">
              <Link to={`/blog/${row.id}`}>
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
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} sm={6} md={2}>
            <Form.Label>Topic</Form.Label>
            <TopicDropdown updateTopic={handleTopicChange} value={topic} />
          </Col>
          <Col xs={12} sm={6} md={2}>
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
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="datetime-local"
              id="blog-table-start-date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Form.Label>End date</Form.Label>
            <Form.Control
              type="datetime-local"
              id="blog-table-end-date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Col>
          <Col xs={12} sm={6} md={2}>
            <div className="table-button-generate">
              <Button variant="outline-secondary" type="submit">
                Generate
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 mb-2">
          <Col xs={6} sm={3}>
            <Form.Control
              type="search"
              id="blog-table-search"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchChange}
              className="me-2"
              aria-label="Search"
            />
          </Col>
        </Row>
      </Form>
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
        paginationTotalRows={totalRows}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        onChangeRowsPerPage={handleRowsPerPageChange}
        onChangePage={handlePageChange}
        sortServer
        onSort={handleSort}
      />
    </>
  );
};

export default BlogTable;
