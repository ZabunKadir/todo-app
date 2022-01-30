import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useCookies } from "react-cookie";

import ErrorCard from "../components/errorCard";

import axios from "axios";

import "../style/signUp.css";

const initialState = { name: "", surname: "", email: "", password: "" };

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [cookies, setCookie] = useCookies(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/users/register",
        formData
      );
      setCookie("user", res.data);
      navigate("/");
    } catch (error) {
      setErr(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className="signUp">
      <div className="signUp-form">
        <form onSubmit={handleSubmit}>
          <span className="signUp-form-title">REGISTER</span>
          {err ? <ErrorCard errorValue={err} active={true} /> : null}
          <div className="signUp-form-inputs">
            <input
              className="signUp-form-inputs-item"
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
            />
            <input
              className="signUp-form-inputs-item"
              placeholder="Surname"
              type="text"
              name="surname"
              id="surname"
              onChange={handleChange}
            />
            <input
              className="signUp-form-inputs-item"
              placeholder="E-mail"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
            <input
              className="signUp-form-inputs-item"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="signUp-form-buttons">
            <button className="signUp-form-buttons-item login" type="submit">
              Register
            </button>
            <Link className="signUp-form-buttons-item link" to="/">
              Go Home Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
