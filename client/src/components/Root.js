// import Button from "./components/Button";
import Button from "@material-ui/core/Button";

export default function Root() {
  return (
    <div>
      <div>
        <img src="https://images.pexels.com/photos/6097827/pexels-photo-6097827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
      </div>
      <h2>Root</h2>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          console.log("CLICKED");
        }}
      >
        Login
      </Button>{" "}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          console.log("CLICKED");
        }}
      >
        Register
      </Button>
    </div>
  );
}
