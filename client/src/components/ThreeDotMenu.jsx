import React, { useState } from "react";
import "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ThreeDotMenu = ({ data }) => {
  const [optionVisible, setOptionVisible] = useState(false);

  const handleOption = () => {
    setOptionVisible(!optionVisible);
  };

  return (
    <>
      <div>
        <div className="position-relative px-3" onClick={handleOption}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        {optionVisible && (
          <div className="overlay position-absolute bg-light z-3">
            <button
              type="button"
              className="btn btn-outline-secondary my-1"
              onClick={handleOption}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleOption}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ThreeDotMenu;
