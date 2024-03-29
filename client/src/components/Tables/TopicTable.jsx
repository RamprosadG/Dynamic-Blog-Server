import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableCustomStyles from "./TableCustomStyles";

const TopicTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationTotalRows, setPaginationTotalRows] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [searchText, setSearchText] = useState("");
  const [update, setUpdate] = useState(false);

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

  const handleUpdateBlog = () => {};

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
    {
      sortable: false,
      width: "100px",
      cell: (row) => {
        return (
          <div className="container ms-2">
            <div className="d-flex justify-content-start">
              <Link to="/topic/update" state={{ id: row.id }}>
                <button
                  type="button"
                  className="btn btn-secondary, btn-sm"
                  onClick={handleUpdateBlog}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </Link>
              <button type="button" className="btn btn-secondary, btn-sm">
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
        id="topic-table"
        striped={true}
        highlightOnHover={true}
        columns={columnsOfTopic}
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

export default TopicTable;