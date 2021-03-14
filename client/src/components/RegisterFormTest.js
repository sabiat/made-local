import {useState} from 'react';
import axios from 'axios';

export default function RegistrationFormTest(props) {
  
  const [state, setState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const sendDetailsToServer = () => {
    if(state.username.length && state.firstName.length && state.lastName.length && state.email.length && state.password.length && state.confirmPassword.length) {
          axios({
          method: 'post',
          url: '/api/users',
          data: {
            username: state.username,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword
          }
        }).then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    // redirectToHome();
                    //props.showError(null)
                } else{
                  console.log("error")  
                  //props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    } else {
        props.showError('Please enter valid username and password')    
    }
    
}

  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer()    
}

  return(
        <div>
            <form>
            <div>
                <input type="name" 
                       id="username" 
                       placeholder="Username"
                       value={state.username}
                       onChange={handleChange}
                />
                </div>
                <div>
                <input type="name" 
                       id="firstName" 
                       placeholder="First Name"
                       value={state.firstName}
                       onChange={handleChange}
                />
                </div>
                <div>
                <input type="name" 
                       id="lastName" 
                       placeholder="Last Name"
                       value={state.lastName}
                       onChange={handleChange}
                />
                </div>
                <div>
                <input type="email" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email"
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div>
                    <input type="password" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                       onChange={handleChange}
                    />
                </div>
                <div>
                    <input type="password" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                       onChange={handleChange}
                    />
                </div>
                <button 
                    type="submit"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
        </div>
    )
}