import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

const HomeHooks = () => {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [todoContext, setTodoContext] = useState(null);
  const [displayTodo, setDisplayTodo] = useState([]);
  const controlAuthorizon = () => {
    if (cookie.user) {
      setIsLogin(true);
      setUser(cookie.user);
    } else {
      setIsLogin(false);
      setUser(null);
    }
  };

  const listControl = (todo, type) => {
    const todos = [];
    if (todo) {
      if (type) {
        todo?.filter((item) =>
          item.status === type ? todos.push(item) : null
        );
      } else {
        todo?.map((item) => todos.push(item));
      }
      setDisplayTodo(todos);
    } else {
      console.log("Not Logged In!");
    }
  };
  const addTodo = async (e, userId, token, context) => {
    e.preventDefault();

    if (userId && token && isLogin) {
      try {
        const res = await axios.post("http://localhost:5000/todos/addTodo", {
          userId,
          token,
          context,
        });
        setCookie("user", res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const changeValue = (value) => {
    setTodoContext(value);
  };
  const clearUserCookie = () => {
    removeCookie("user");
  };
  useEffect(() => {
    controlAuthorizon();
    setDisplayTodo(user?.todo);
  }, [cookie, user]);

  return {
    isLogin,
    user,
    clearUserCookie,
    addTodo,
    changeValue,
    todoContext,
    listControl,
    displayTodo,
  };
};
export default HomeHooks;
