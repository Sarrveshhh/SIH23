import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCallback, useRef, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import disasterType from './disasterType.json';
import Navbar from './components/Navbar/Navbar';
import userIcon from './UserLocationIcon';

function Disaster() {
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [draggable, setDraggable] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: position object contains the coordinates
          const { latitude, longitude } = position.coords;
          console.log('Latitude:', latitude);
          setLatitude(latitude);

          console.log('Longitude:', longitude);
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
  const center = {
    lat: latitude,
    lng: longitude,
  };
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  // console.log(position?.lat);
  // console.log(position?.lng);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(marker.getLatLng());
          setLatitude(marker.getLatLng().lat);
          setLongitude(marker.getLatLng().lng);
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <Navbar />
      <div className="w-1/2 mx-auto mt-20">
        <h1 className="font-bold text-3xl mb-10 mt-2">Add disaster </h1>
        <div class="mb-4 flex">
          <label
            for="title"
            class="block text-gray-700 my-auto mr-16 font-bold mb-2"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            class="shadow appearance-none border ml-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className='flex mb-4'>
          <p className='block text-gray-700 my-auto mr-7 font-bold'>Select date</p>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" // You can customize the date format
            isClearable // Allows clearing the selected date
            showYearDropdown // Show a dropdown for selecting the year
            scrollableYearDropdown // Make the year dropdown scrollableYearDropdown
            className="shadow appearance-none border rounded"
          />
          <p className="ml-2">
          {' '}
          Selected Date:{' '}
          {selectedDate ? selectedDate.toDateString() : 'No date selected'}
        </p>
        </div>

        
        <div class="mb-4 flex">
          <label
            for="description"
            class="block text-gray-700 font-bold mb-2 my-auto mr-5"
          >
            Description:
          </label>
          <textarea
            id="description"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div class="mb-4 flex">
          <label
            for="address"
            class="block text-gray-700 font-bold mb-2 my-auto mr-11"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4 flex">
          <label
            for="requirements"
            class="block text-gray-700 font-bold mb-2 my-auto mr-2"
          >
            Requirements
          </label>
          <input
            type="text"
            id="address"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="form-group mb-4 ">
          <button
            className="flex mx-auto justify-between items-center bg-gray-200 shadow appearance-none border rounded px-4 py-2 rounded-lg"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Choose Type of disaster
            {!isOpen ? (
              <BiSolidDownArrow className="ml-2"></BiSolidDownArrow>
            ) : (
              <BiSolidUpArrow className="ml-2"></BiSolidUpArrow>
            )}
          </button>
          {isOpen && (
            <div className="">
              {disasterType.map((item, i) => (
                <div key={i}>
                  <h3>{item.tod}</h3>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="block text-gray-700 font-bold mb-2">Drop a pin on the exact location of disaster </p>
        {latitude != null && (
          <MapContainer
            center={[latitude, longitude]}
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
                position={[latitude, longitude]}
                ref={markerRef}
                icon={userIcon}
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
        )}
      </div>
      <button className=' bg-gray-200 shadow appearance-none border rounded p-2'>Submit</button>
    </>
  );
}

export default Disaster;
