import ShopAbout from './Shop Components/ShopAbout';
import ShopContact from './Shop Components/ShopContact';
import ShopMap from './Shop Components/ShopMap';
import ShopPhotos from './Shop Components/ShopPhotos';
import ShopMessageBoard from './Shop Components/ShopMessageBoard';
import axios from 'axios';
import { useEffect, useState } from 'react';

// https://material-ui.com/components/grid-list/

export default function ShopProfile() {
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState({
    shop: []
  });

  const fetchshopDetails = () => {
    const endpoint = window.location.pathname.split('/')
    const id = endpoint[endpoint.length - 1]
    axios.get(`/api/shops/${id}`)
    .then(res => {
      setState(prev => ({...prev, shop: res.data}));
      setLoading(false);
    })
  }
  useEffect(() => {
    fetchshopDetails();
  }, []);


  return (
  <div>
    <ShopAbout /> 
    <ShopContact />
    {isLoading ? <div className="App">Loading...</div> : <ShopMap name={state.shop[0].name} lat={state.shop[0].latitude} lon={state.shop[0].longitude}/> }
    <ShopPhotos />
    <ShopMessageBoard />
    <h2>Shop profile</h2>
  </div>
)}