import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import customIcon from "./CustomMarkerIcon";
import "./MapComponent.css";
import Navbar from "./components/Navbar/Navbar";

function MapComponent({ agencies }) {
  const [userLocation, setUserLocation] = useState(null);
  const[latitude,setLatitude]=useState(null);
  const[longitude,setLongitude]=useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: position object contains the coordinates
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          setLatitude(latitude);

          console.log("Longitude:", longitude);
          setLongitude(longitude);
        },
        (error) => {
          // Error: handle the error or show an error message to the user
          console.log(error);
        }
      );
    } else {
      // Geolocation API is not supported
      console.log('Geolocation is not supported');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
      {/* Render userLocation or a loading message */}
      {latitude!=null ? (
        // <p>User Location: {userLocation[0]}, {userLocation[1]}</p>
        <div className="map">
        <MapContainer
          center={ [latitude,longitude]} // Set the initial center of the map
          zoom={13} // Set the initial zoom level
          style={{ height: "100vh", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
            <Marker
              
              position={[latitude,longitude]} // Assuming "location" contains [latitude, longitude] coordinates
              
            ></Marker>
          {agencies.map((agency, index) => (
            <Marker
              key={index}
              position={agency.longlat} // Assuming "location" contains [latitude, longitude] coordinates
              icon={customIcon}
            >
              <Popup>
                <strong>{agency.name}</strong>
                <p>Phone: {agency.phoneNumber}</p>
                <p>Email: {agency.email}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      ) : (
        <p className="mt-40">Loading user location...</p>
      )}
    </div>
      
    </>
  );
}

export default MapComponent;
