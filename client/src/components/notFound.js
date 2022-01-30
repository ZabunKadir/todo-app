import { Link } from "react-router-dom";

const NotFound = () => {
  //Styles
  const spanStyle = {
    width: "360px",
    height: "80px",
    lineHeight: "80px",
    color: "white",
    fontSize: "44px",
    marginLeft: "80px",
  };

  const linkStyle = {
    display: "flex",
    width: "360px",
    height: "80px",
    lineHeight: "80px",
    color: "red",
    fontSize: "44px",
    borderRadius: "10px",
    backgroundColor: "gray",
    justifyContent: "center",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span style={spanStyle}>Not Found!</span>
      <Link to="/" style={linkStyle}>
        Go Home
      </Link>
    </div>
  );
};
export default NotFound;
