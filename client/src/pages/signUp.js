import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import "../style/signUp.css";

const initialState = { name: "", surname: "", email: "", password: "" };

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { res } = await axios.post("/users/signUp", formData);
      setCookie("user", res.user, { expires: 60 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signUp">
      <div className="signUp-form">
        <form onSubmit={handleSubmit}>
          <span className="signUp-form-title">REGISTER</span>
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
