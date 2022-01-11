import { Link } from "react-router-dom";

import ListElement from "../components/listElement";

import "../style/home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="header">
        <div className="header-logo">
          <h1>
            <Link className="header-logo-item" to="/">
              TO-DO LIST
            </Link>
          </h1>
        </div>
        <div className="header-links">
          <Link className="header-links-item" to="/signUp">
            Sign Up
          </Link>
          <Link className="header-links-item" to="/signIn">
            Sign In
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="content-buttons">
          <input
            placeholder="Add New Todo"
            name="text"
            className="content-buttons-input"
          />
          <button className="content-buttons-button">Add</button>
        </div>
        <div className="content-list">
          {true ? (
            <ListElement index={1}></ListElement>
          ) : (
            <div className="content-list-no">
              <span className="content-list-no-text">No Content!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
