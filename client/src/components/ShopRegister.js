import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ShopRegister(props) {
  const classes = useStyles();

  let history = useHistory();
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
    category: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const sendDetailsToServer = () => {
    if (
      state.name.length &&
      state.description.length &&
      state.streetAddress.length &&
      state.postalCode.length &&
      state.city.length &&
      state.phoneNumber.length &&
      state.social.length &&
      state.photo.length
    ) {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${state.postalCode}.json?worldview=cn&access_token=${process.env.REACT_APP_MAPBOX}`
        )
        .then((result) => {
          console.log("success");
          axios({
            method: "post",
            url: "/api/shops",
            data: {
              name: state.name,
              description: state.description,
              streetAddress: state.streetAddress,
              postalCode: state.postalCode,
              city: state.city,
              longitude: result.data.features[0].center[0],
              latitude: result.data.features[0].center[1],
              phoneNumber: state.phoneNumber,
              social: state.social,
              photo: state.photo,
              delivery: state.delivery,
              pickup: state.pickup,
              shipping: state.shipping,
              category: state.category,
            },
          })
            .then(function (response) {
              if (response.status === 200) {
                setState((prevState) => ({
                  ...prevState,
                  successMessage:
                    "Registration successful. Redirecting to home page..",
                }));
                history.push("/home");
              } else {
                console.log("error");
              }
            })
            .catch(function (error) {
              console.log("error", error);
            });
        });
    } else {
      alert("Oops! Certain fields are empty! Please fully fill the form.");
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer();
    history.push("/home");
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <div className={classes.paper}> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <Avatar className={classes.avatar} style={{ justify: "center" }}>
          <AddIcon />
        </Avatar>
      </div>
      <Typography component="h1" variant="h5">
        Add new shop
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="shopName"
              id="name"
              label="Shop Name"
              autoFocus
              type="text"
              placeholder="Shop Name"
              value={state.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={5}>
            <FormControl style={{ minWidth: 120 }}>
              <NativeSelect
                id="category"
                name="category"
                value={state.category}
                onChange={handleChange}
              >
                <option aria-label="Select Category" value="" />
                <option value="Food & Catering">Food & Catering</option>
                <option value="Jewellery & Accessories">
                  Jewellery & Accessories
                </option>
                <option value="Tattoo Artists">Tattoo Artists</option>
                <option value="Clothing">Clothing</option>
                <option value="Events & Planning">Events & Planning</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Health & Wellness">Health & Wellness</option>
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="Shop Description"
              variant="outlined"
              required
              fullWidth
              id="description"
              label="Shop Description"
              autoFocus
              type="text"
              placeholder="Shop Description"
              value={state.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="streetAddress"
              label="Street Address"
              name="Street Address"
              type="address"
              placeholder="123 Memory Lane"
              value={state.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="city"
              label="City"
              type="text"
              id="city"
              placeholder="City"
              value={state.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="postalCode"
              label="Postal Code"
              id="postalCode"
              placeholder="H0H 0H0"
              value={state.postalCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="phone number"
              label="Phone Number"
              type="phone"
              id="phoneNumber"
              placeholder="555-555-5555"
              value={state.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="social"
              label="Instagram Handle"
              type="text"
              id="social"
              placeholder="@social"
              value={state.social}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="photo"
              label="Photo URL"
              type="url"
              id="photo"
              placeholder="Paste a link to your photo!"
              value={state.photo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.delivery}
                  onChange={handleCheck}
                  name="Delivery"
                  id="delivery"
                />
              }
              label="Delivery"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.pickup}
                  onChange={handleCheck}
                  name="Pickup"
                  id="pickup"
                />
              }
              label="Pickup"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.shipping}
                  onChange={handleCheck}
                  name="Shipping"
                  id="shipping"
                />
              }
              label="Shipping"
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submit}
          onClick={handleSubmitClick}
        >
          +
        </Button>
        {/* <div>
        
        
        <div>
        <select name="category"
        id="category"
        value={state.category}
        onChange={handleChange}
        >
            <option value="Food & Catering">Food & Catering</option>
            <option value="Jewellery & Accessories">Jewellery & Accessories</option>
            <option value="Tattoo Artists">Tattoo Artists</option>
            <option value="Clothing">Clothing</option>
            <option value="Events & Planning">Events & Planning</option>
            <option value="Home & Living">Home & Living</option>
            <option value="Health & Wellness">Health & Wellness</option>
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
          <label htmlFor="delivery">Delivery</label>
          <input type="checkbox"
            id="delivery"
            checked={state.delivery}
            onChange={handleCheck}
          />
        </div>
        <div>
          <label htmlFor="pickup">Pickup</label>
          <input type="checkbox"
            id="pickup"
            checked={state.pickup}
            onChange={handleCheck}
          />
        </div>
        <div>
          <label htmlFor="shipping">Shipping</label>
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
    </div> */}
      </form>
    </Container>
  );
}
