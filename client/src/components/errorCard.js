import "../style/errorCard.css";
const ErrorCard = ({ errorValue }) => {
  return (
    <div className="errorCard">
      <div className="errorCard-text">{errorValue}</div>
    </div>
  );
};
export default ErrorCard;
