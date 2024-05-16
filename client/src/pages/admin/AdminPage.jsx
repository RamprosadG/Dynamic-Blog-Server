import React from "react";
import BlogTable from "../../components/Tables/BlogTable";
import { Link } from "react-router-dom";
import TopicTable from "../../components/Tables/TopicTable";

const AdminPage = () => {
  return (
    <>
      <div className="admin-page-style my-3 p-3">
        <div className="row justify-content-between mb-5">
          <div className="col">
            <h1>Blog list</h1>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to="/blog">
              <button type="button" className="btn btn-outline-secondary">
                Add a blog
              </button>
            </Link>
          </div>
        </div>

        <div>
          <BlogTable />
        </div>
        <div className="row justify-content-between mt-5">
          <div className="col">
            <h1>Topic list</h1>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to="/topic">
              <button type="button" className="btn btn-outline-secondary">
                Add a topic
              </button>
            </Link>
          </div>
        </div>
        <div>
          <TopicTable />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
