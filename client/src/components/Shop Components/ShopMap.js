import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../../App.css";


export default function ShopMap() {

  return (
  <div>
    <h2>ShopMap</h2>
    <MapContainer
      className='map-container'
      center={[45.529753, -73.586187]} 
      zoom={17}
    >
      <Marker position={[45.529753, -73.586187]}></Marker>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  </div>
  )
}