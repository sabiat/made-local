// import Button from "./components/Button";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export default function Root() {
  const history = useHistory();
  return (
    <div>
      <div>
        <img
          src="https://images.pexels.com/photos/6097827/pexels-photo-6097827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="home"
        />
      </div>
      <h2>Root</h2>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </Button>{" "}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/register");
        }}
      >
        Register
      </Button>
    </div>
  );
}
