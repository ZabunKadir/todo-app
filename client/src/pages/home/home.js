import { Link } from "react-router-dom";

import { useState } from "react";

import ListElement from "../../components/listElement";

import HomeHooks from "./hooks/homeHooks";

import "../../style/home.css";

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [listType, setListType] = useState("All");
  const {
    isLogin,
    user,
    clearUserCookie,
    addTodo,
    changeValue,
    todoContext,
    listControl,
    displayTodo,
  } = HomeHooks();

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
        {!isLogin ? (
          <div className="header-links">
            <Link className="header-links-item" to="/signUp">
              Sign Up
            </Link>
            <Link className="header-links-item" to="/signIn">
              Sign In
            </Link>
          </div>
        ) : (
          <div className="header-login">
            <div className="header-login-text">
              <span className="header-login-span">
                Hello, {user?.name + " " + user?.surname}
              </span>
            </div>
            <div className="header-login-div">
              <button
                className="header-login-button"
                onClick={() => clearUserCookie()}
              >
                <FontAwesomeIcon
                  className="header-login-icon"
                  icon={faSignOutAlt}
                />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="content">
        <div className="content-buttons">
          <input
            placeholder="Add New Todo"
            name="text"
            className="content-buttons-input"
            id="content"
            onChange={(e) => changeValue(e.target.value)}
          />
          <button
            className="content-buttons-button"
            onClick={(e) => {
              addTodo(e, user?.ID, user?.token, todoContext);
              document.getElementById("content").value = "";
              setListType("All");
            }}
          >
            Add
          </button>
        </div>

        <div className="content-controls">
          <button
            className={
              listType === "All"
                ? "content-controls-item active"
                : "content-controls-item"
            }
            onClick={(e) => {
              setListType("All");
              listControl(user?.todo);
            }}
          >
            All
          </button>
          <button
            className={
              listType === "Todos"
                ? "content-controls-item active"
                : "content-controls-item"
            }
            onClick={(e) => {
              setListType("Todos");
              listControl(user?.todo, "Normal");
            }}
          >
            Todos
          </button>
          <button
            className={
              listType === "Completed"
                ? "content-controls-item active"
                : "content-controls-item"
            }
            onClick={(e) => {
              setListType("Completed");
              listControl(user?.todo, "Completed");
            }}
          >
            Completed
          </button>

          <button
            className={
              listType === "Deleted"
                ? "content-controls-item active"
                : "content-controls-item"
            }
            onClick={(e) => {
              setListType("Deleted");
              listControl(user?.todo, "Deleted");
            }}
          >
            Deleted
          </button>
        </div>
        <div className="content-list">
          {isLogin ? (
            displayTodo?.map((item, index) => (
              <ListElement key={index} index={index + 1} content={item} />
            ))
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
