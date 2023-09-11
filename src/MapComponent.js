import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import customIcon from "./CustomMarkerIcon";
import userIcon from "./UserLocationIcon";
import searchIcon from "./searchAgencyIcon";
import "./MapComponent.css";
import Navbar from "./components/Navbar/Navbar";
import { useMapEvents } from "react-leaflet";

function MapComponent({ agencies }) {
  const[latitude,setLatitude]=useState(null);
  const[longitude,setLongitude]=useState('');

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        var lati = agencies[0].longlat[0]
        var longi = agencies[0].longlat[1]
        console.log(lati, longi)
        setPosition([lati, longi])
        map.flyTo([lati, longi], map.getZoom())
      },
    })
    
    return position === null ? null : (
      <Marker position={position}  icon={searchIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  
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
      <div>
      {/* Render userLocation or a loading message */}
      {latitude!=null ? (
        
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
          {agencies.length===1 && <LocationMarker/>}
            <Marker
              position={[latitude,longitude]} // Assuming "location" contains [latitude, longitude] coordinates
              icon={userIcon}
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
