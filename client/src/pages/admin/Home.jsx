import React from "react";
import BlogTable from "./BlogTable";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h1>Admin Page</h1>
      </div>

      <div className="row text-start align-items-start my-3">
        <div className="col-4">
          <Link to="/admin/topic">
            <button type="button" className="btn btn-primary">
              Add a new topic
            </button>
          </Link>
        </div>
        <div className="col-4">
          <Link to="/admin/blog">
            <button type="button" className="btn btn-primary">
              Add a new blog
            </button>
          </Link>
        </div>
      </div>

      <div>
        <BlogTable />
      </div>
    </>
  );
};

export default Home;
