import React from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "../../App.css";

export default function ShopMap(props) {
  const coords = [props.lat, props.lon];

  return (
    <MapContainer className="map-container" center={coords} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Circle
        center={{ lat: props.lat, lng: props.lon }}
        fillColor="#588b8b"
        color="#588b8b"
        radius={400}
      />
      {/* <Marker position={coords}></Marker> */}
    </MapContainer>
  );
}
