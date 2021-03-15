import { useState } from 'react';
import axios from 'axios';

export default function RegistrationForm(props) {

  const [state, setState] = useState({
    name: "",
    description: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    phoneNumber: "",
    social: "",
    photo: "",
    delivery: false,
    pickup: false,
    shipping: false,
    category: ""
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleCheck = (e) => {
    const { id, checked } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: checked
    }))
  }

  const sendDetailsToServer = () => {
    if (state.name.length && state.description.length && state.streetAddress.length && state.postalCode.length && state.city.length && state.phoneNumber.length && state.social.length && state.photo.length) {
      //function to convert address into lat/lng
      axios({
        method: 'post',
        url: '/api/shops',
        data: {
          name: state.name,
          description: state.description,
          streetAddress: state.streetAddress,
          postalCode: state.postalCode,
          city: state.city,
          latitude: state.latitude,
          longitude: state.longitude,
          phoneNumber: state.phoneNumber,
          social: state.social,
          photo: state.photo,
          delivery: state.delivery,
          pickup: state.pickup,
          shipping: state.shipping,
          category: state.category
        }
      }).then(function (response) {
        if (response.status === 200) {
          setState(prevState => ({
            ...prevState,
            'successMessage': 'Registration successful. Redirecting to home page..'
          }))
          // redirectToHome();
          //props.showError(null)
        } else {
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

  return (
    <div>
      <form>
        <div>
          <input type="name"
            id="name"
            placeholder="Shop Name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea type="text"
            id="description"
            placeholder="Shop Description"
            value={state.description}
            onChange={handleChange}
          />
        </div>
        <div>
        <select name = "category"
        id="category"
        value={state.category}
        onChange={handleChange}
        >
            <option value = "Food" selected>Food & Catering</option>
            <option value = "Jewellery & Accessories">Jewellery & Accessories</option>
            <option value = "Clothing">Clothing</option>
            <option value = "Events & Planning">Events & Planning</option>
            <option value = "Home & Living">Home & Living</option>
            <option value = "Health & Wellness">Health & Wellness</option>
         </select>
        </div>
        <div>
          <input type="name"
            id="streetAddress"
            placeholder="Street Address"
            value={state.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="name"
            id="postalCode"
            placeholder="Postal Code"
            value={state.postalCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="name"
            id="city"
            placeholder="City"
            value={state.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="name"
            id="phoneNumber"
            placeholder="Phone Number"
            value={state.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="name"
            id="social"
            placeholder="Instagram Handle"
            value={state.social}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="url"
            id="photo"
            placeholder="Profile Photo (URL)"
            value={state.photo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="delivery">Delivery</label>
          <input type="checkbox"
            id="delivery"
            checked={state.delivery}
            onChange={handleCheck}
          />
        </div>
        <div>
          <label for="pickup">Pickup</label>
          <input type="checkbox"
            id="pickup"
            checked={state.pickup}
            onChange={handleCheck}
          />
        </div>
        <div>
          <label for="shipping">Shipping</label>
          <input type="checkbox"
            id="shipping"
            checked={state.shipping}
            onChange={handleCheck}
          />
        </div>
        <br></br>
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