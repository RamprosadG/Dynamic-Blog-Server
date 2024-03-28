import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Form } from "react-bootstrap";
import "bootstrap";
import { customStyles, columnsOfTopic } from "../../data/tableCustomStyles";

const TopicTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationTotalRows, setPaginationTotalRows] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage, paginationTotalRows, sortColumn, sortDirection, searchText]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const formData = {
        page: currentPage,
        row: paginationTotalRows,
        sortCol: sortColumn,
        sortDir: sortDirection,
        search: searchText,
      };
      await axios
        .get("http://localhost:5000/admin/getTopicForTable", {
          params: formData,
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log("There is an error to fetch topic");
      setData([]);
      setLoading(false);
    }
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

  const handleSearchChanges = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="row mt-5 mb-2">
        <div className="col-3">
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChanges}
            className="me-2"
            aria-label="Search"
          />
        </div>
      </div>
      <DataTable
        striped={true}
        highlightOnHover={true}
        columns={columnsOfTopic}
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

export default TopicTable;
