import { useState } from "react";

import moment from "moment";

import "../style/listElement.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import HomeHooks from "../pages/home/hooks/homeHooks";

const ListElement = ({ index, content }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(content?.context);

  const { todoActions, user } = HomeHooks();
  return (
    <div className="element">
      <span
        className={
          index % 2 === 0 ? "element-index index-even" : "element-index"
        }
      >
        {index}
      </span>
      <div className="element-content">
        <div
          className={
            "element-content-text" +
            (content?.status === "Completed"
              ? "-completed"
              : content?.status === "Deleted"
              ? "-deleted"
              : "")
          }
        >
          {isEditing ? (
            <>
              <input
                className="element-content-text-input"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
              <button
                className="element-content-text-button"
                onClick={(e) => {
                  todoActions(
                    e,
                    user?.ID,
                    user?.token,
                    content?.id,
                    "Edit",
                    inputValue
                  );
                  setIsEditing(false);
                }}
              >
                <FontAwesomeIcon
                  className="element-content-text-check"
                  icon={faCheck}
                />
              </button>
              <button
                className="element-content-text-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FontAwesomeIcon
                  className="element-content-text-cancel"
                  icon={faTimes}
                />
              </button>
            </>
          ) : (
            content?.context
          )}
        </div>
        <div className="element-content-time">
          <span style={{ color: " gray " }}>Created At:</span>
          {moment(content?.createdAt).format("M.D.YYYY - h:mm a")}

          {content?.status === "Completed" ? (
            <>
              {" - "}
              <span style={{ color: " gray " }}>Completed At:</span>
              {moment(content?.completedAt).format("M.D.YYYY - h:mm a")}
            </>
          ) : content?.status === "Deleted" ? (
            <>
              {" - "}
              <span style={{ color: " gray " }}>Deleted At:</span>
              {moment(content?.deletedAt).format("M.D.YYYY - h:mm a")}
            </>
          ) : null}
        </div>
      </div>
      <div className="element-buttons">
        <button
          className="element-buttons-item item-remove"
          onClick={(e) =>
            todoActions(e, user?.ID, user?.token, content?.id, "Delete")
          }
          disabled={content?.status === "Normal" ? false : true}
        >
          <FontAwesomeIcon
            className="item-icon"
            icon={faTrashAlt}
          ></FontAwesomeIcon>
        </button>
        <button
          className="element-buttons-item item-done"
          onClick={(e) =>
            todoActions(e, user?.ID, user?.token, content?.id, "Complete")
          }
          disabled={content?.status === "Normal" ? false : true}
        >
          <FontAwesomeIcon
            className="item-icon"
            icon={faCheck}
          ></FontAwesomeIcon>
        </button>
        <button
          className="element-buttons-item item-edit"
          onClick={() => setIsEditing(!isEditing)}
          disabled={content?.status === "Normal" ? false : true}
        >
          <FontAwesomeIcon
            className="item-icon"
            icon={faEdit}
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};
export default ListElement;
