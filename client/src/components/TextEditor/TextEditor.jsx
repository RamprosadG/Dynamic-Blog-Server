import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const TextEditor = ({ updateDescription, value }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(value);
  }, [value]);

  useEffect(() => {
    updateDescription(content);
  }, [content]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <ReactQuill
        id="react-quill"
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Write your blog..."
      />
    </div>
  );
};

export default TextEditor;
