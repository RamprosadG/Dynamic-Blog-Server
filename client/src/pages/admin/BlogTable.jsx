import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const BlogTable = () => {
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
        .get("http://localhost:5000/user", {
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

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    {
      name: "Id",
      sortField: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      sortField: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      sortField: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    // Add more columns as needed
  ];

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={100}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        sortSever
        onSort={handleSort}
      />
    </>
  );
};

export default BlogTable;
