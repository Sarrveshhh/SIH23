import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCallback, useRef, useMemo } from "react";

const center = {
  lat: 19.206472,
  lng: 73.189234,
};
function Disaster({ agencies }) {
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const [email, setEmail] = useState("");
  const [disasterType, setDisasterType] = useState("");
  // const [posted, setPosted] = useState(false);
  const markerRef = useRef(null);
  console.log(position?.lat);
  console.log(position?.lng);

  // const handleDisasterPost = () => {
  //   // Find agencies with expertise matching the disaster type
  //   const matchingAgencies = agencies.filter((agency) =>
  //     agency.expertise.includes(disasterType)
  //   );

  //   // Send email notifications to matching agencies
  //   matchingAgencies.forEach((agency) => {
  //     sendEmailNotifications(agency.email, disasterType);
  //   });
  //   setPosted(true);
  // };

  // const sendEmailNotifications = (recipient, disasterType) => {
  //   sendEmail(
  //     recipient,
  //     `Disaster Alert: ${disasterType}`,
  //     `A disaster of type ${disasterType} has been posted.`
  //   );
  // };

  const sendEmail = async (e) => {
    e.preventDefault();

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 401 || !data) {
      console.log("error");
    } else {
      setEmail("");
      console.log("Email sent");
    }
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(marker.getLatLng());
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <>
      <div className="w-1/2 mx-auto">
        <h1 className="font-bold text-3xl">Add disaster </h1>
        <div class="mb-4 flex">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="email"
            value={email}
            // value={disasterType}
            onChange={(e) => setEmail(e.target.value)}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label
            for="description"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div class="mb-4">
          <label
            for="address"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <MapContainer
          center={[19.206472, 73.189234]}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {!clickedLatLng && (
            <Marker
              draggable={draggable}
              eventHandlers={eventHandlers}
              position={position}
              ref={markerRef}
            >
              <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                  {draggable
                    ? "Marker is draggable"
                    : "Click here to make marker draggable and move to desired location"}
                </span>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <button variant="primary" type="submit" onClick={sendEmail}>
        Post Disaster
      </button>
    </>
  );
}

export default Disaster;
