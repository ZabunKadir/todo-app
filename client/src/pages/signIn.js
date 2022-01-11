import { Link } from "react-router-dom";
import "../style/signIn.css";
const SignIn = () => {
  const submitHandler = () => {};
  return (
    <div className="signIn">
      <div className="signIn-form">
        <form onSubmit={submitHandler}>
          <span className="signIn-form-title">LOGIN</span>
          <div className="signIn-form-inputs">
            <input
              className="signIn-form-inputs-item"
              placeholder="E-mail"
              type="email"
              name="email"
            />
            <input
              className="signIn-form-inputs-item"
              placeholder="Password"
              type="password"
              name="password"
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
