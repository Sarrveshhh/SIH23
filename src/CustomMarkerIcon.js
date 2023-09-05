import L from "leaflet";

// Define your custom marker icon
const customIcon = new L.Icon({
  iconUrl: "/images/fires.png", // Specify the path to your custom icon image
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point relative to the icon
});

export default customIcon;
