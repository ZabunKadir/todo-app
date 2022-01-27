import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import "../style/signIn.css";

const initialState = { email: "", password: "" };

const SignIn = () => {
  const [formData, setFormData] = useState(initialState);
  const [cookies, setCookie] = useCookies(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/users/login",
        formData
      );

      setCookie("user", res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signIn">
      <div className="signIn-form">
        <form onSubmit={handleSubmit}>
          <span className="signIn-form-title">LOGIN</span>
          <div className="signIn-form-inputs">
            <input
              className="signIn-form-inputs-item"
              placeholder="E-mail"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
            <input
              className="signIn-form-inputs-item"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="signIn-form-buttons">
            <button className="signIn-form-buttons-item login" type="submit">
              Login
            </button>
            <Link className="signIn-form-buttons-item link" to="/">
              Go Home Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
