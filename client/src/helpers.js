import axios from "axios";
import React, { useEffect, useState } from "react";

const fetchShopData = () => {
  axios
    .get("/api/shops")
    .then((res) => {
      const shop = res.data;
      this.setState({ shop });
    })
    .catch((err) => console.log(err));
};

// export { fetchShopData };

// componentDidMount() {
//   axios.get(`https://jsonplaceholder.typicode.com/users`)
//     .then(res => {
//       const persons = res.data;
//       this.setState({ persons });
//     })
