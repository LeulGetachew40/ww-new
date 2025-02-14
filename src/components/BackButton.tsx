import { useNavigate } from "react-router-dom";
import Button from "./app-components/Button";
// import btnStyles from "./Button.module.css";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      btnClass={"back"}
      handleClick={(e) => {
        e.preventDefault();
        // navigate(-1);
        navigate("/app/cities");
      }}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
