import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../../App.css";


export default function ShopMap(props) {
  const coords = [props.lat, props.lon]

  return (
  <div>
    <h2>{props.name}</h2>
    <MapContainer
      className='map-container'
      center={coords} 
      zoom={17}
    >
      <Marker position={coords}></Marker>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  </div>
  )
}