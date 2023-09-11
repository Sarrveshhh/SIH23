import L from "leaflet";

// Define your custom marker icon
const userIcon = new L.Icon({
  iconUrl: "/images/userLoc.png", // Specify the path to your custom icon image
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point relative to the icon
});

export default userIcon;