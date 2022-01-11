import "../style/listElement.css";

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
      <div className="element-content">Deneme yazisi girildi</div>
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
