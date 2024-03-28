import React from "react";
import BlogTable from "./BlogTable";
import { Form, Link } from "react-router-dom";
import "../../styles/admin.css";
import TopicTable from "./TopicTable";

const Home = () => {
  return (
    <>
      <div className="admin-body my-3 p-3">
        <div className="row justify-content-between mb-5">
          <div className="col">
            <h1>List of blog</h1>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to="/admin/blog">
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
            <h1>List of topic</h1>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to="/admin/topic">
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

export default Home;
