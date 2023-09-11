import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCallback, useRef, useMemo } from 'react';

const center = {
  lat: 19.206472,
  lng: 73.189234,
};
function Disaster() {
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  console.log(position?.lat);
  console.log(position?.lng);
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
            type="text"
            id="title"
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
          style={{ height: '300px', width: '100%' }}
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
                    ? 'Marker is draggable'
                    : 'Click here to make marker draggable and move to desired location'}
                </span>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </>
  );
}

export default Disaster;
