import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function RegistrationForm(props) {
  const [state, setState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const sendDetailsToServer = () => {
    if (
      state.username.length &&
      state.firstName.length &&
      state.lastName.length &&
      state.email.length &&
      state.photo.length &&
      state.password.length &&
      state.confirmPassword.length
    ) {
      axios({
        method: "post",
        url: "/api/users/register",
        data: {
          username: state.username,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          photo: state.photo,
          password: state.password,
          confirmPassword: state.confirmPassword,
        },
      })
        .then(function (response) {
          if (response.status === 200) {
            const loggedInUser = {
              id: response.data.id,
              email: response.data.email,
              user_name: response.data.user_name,
            };
            props.setAppUser(loggedInUser);
            history.push("/home");
          } else {
            console.log("error");
            //props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError("Please enter valid username and password");
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer();
  };

  return (
    <div>
      <form>
        <div>
          <input
            type="name"
            id="username"
            placeholder="Username"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="name"
            id="firstName"
            placeholder="First Name"
            value={state.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="name"
            id="lastName"
            placeholder="Last Name"
            value={state.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="photo"
            id="photo"
            placeholder="Picture"
            value={state.photo}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmitClick}>
          Register
        </button>
      </form>
    </div>
  );
}
