import ShopAbout from './Shop Components/ShopAbout';
import ShopContact from './Shop Components/ShopContact';
import ShopMap from './Shop Components/ShopMap';
import ShopPhotos from './Shop Components/ShopPhotos';
import ShopMessageBoard from './Shop Components/ShopMessageBoard';

// https://material-ui.com/components/grid-list/

export default function ShopProfile() {
  return (
  <div>
    <ShopAbout /> 
    <ShopContact />
    <ShopMap />
    <ShopPhotos />
    <ShopMessageBoard />
    <h2>Shop profile</h2>
  </div>
)}