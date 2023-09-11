import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import customIcon from "./CustomMarkerIcon";
import "./MapComponent.css";
import Navbar from "./components/Navbar/Navbar";

function MapComponent({ agencies }) {
  const [userLocation, setUserLocation] = useState(null);

  const updateUserLocation = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLocation([latitude, longitude]);
    console.log(userLocation);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      updateUserLocation,
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  // useEffect(() => {
  //   // Use the Geolocation API to get the user's current location
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setUserLocation([latitude, longitude]);
  //       console.log(setUserLocation);
  //     },
  //     (error) => {
  //       console.error("Error getting user location:", error);
  //     }
  //   );
  // }, []);
  
  return (
    <>
      <Navbar />
      <div className="map">
      {userLocation ? ( // Conditionally render MapContainer when userLocation is available
        <MapContainer
          center={userLocation || [19.064626928104452, 72.83581727891169]} // Set the initial center of the map
          zoom={13} // Set the initial zoom level
          style={{ height: "100vh", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

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
         ) : (
          // Render a loading message or fallback UI until userLocation is available
          <p>Loading map...</p>
        )}
      </div>
    </>
  );
}

export default MapComponent;
