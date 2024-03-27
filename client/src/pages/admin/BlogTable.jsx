import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import TopicDropdown from "../../components/Dropdown";
import { Form } from "react-bootstrap";
import "bootstrap";
import { customStyles, columnsOfBlog } from "../../data/tableCustomStyles";

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
      setData([]);
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

  return (
    <>
      <div className="row">
        <div className="col-3">
          <Form.Label>Topic</Form.Label>
          <TopicDropdown udpateTopic={handleTopicChange} />
        </div>
        <div className="col-3">
          <Form.Label>Status</Form.Label>
          <select
            className="form-select"
            onChange={handleStatusChange}
            value={status}
          >
            <option value="">Select status</option>
            <option value="true">Published</option>
            <option value="false">Unpublished</option>
          </select>
        </div>
        <div className="col-3">
          <Form>
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="datetime-local"
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
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            className="me-2"
            aria-label="Search"
          />
        </div>
      </div>
      <DataTable
        striped={true}
        highlightOnHover={true}
        columns={columnsOfBlog}
        data={data}
        customStyles={customStyles}
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
