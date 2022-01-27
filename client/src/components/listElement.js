import "../style/listElement.css";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const ListElement = ({ index, content }) => {
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
        <div className="element-content-text">{content?.context}</div>
        <div className="element-content-time">
          <label style={{ color: " gray " }}>Created At:</label>
          {moment(content?.createdAt).format("M.D.YYYY - h:mm a")}
        </div>
      </div>
      <div className="element-buttons">
        <button className="element-buttons-item item-remove">
          <FontAwesomeIcon
            className="item-icon"
            icon={faTrashAlt}
          ></FontAwesomeIcon>
        </button>
        <button className="element-buttons-item item-done">
          <FontAwesomeIcon
            className="item-icon"
            icon={faCheck}
          ></FontAwesomeIcon>
        </button>
        <button className="element-buttons-item item-edit">
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
