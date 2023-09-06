import "./App.css";
import LoginPage from "./LoginPage";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapComponent from "./MapComponent"; // Import the AgencyMap component
import agenciesData from "./agencies.json"; // Import your JSON data
import Filter from "./Filter.js";
import Home from "./pages/Home/Home";

function App() {
  const handleSearch = (searchText) => {
    console.log("Searching for:", searchText);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/register" element={<RegistrationForm />} />
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/map"
            element={
              <div>
                <Filter
                  onSearch={handleSearch}
                  agencies={agenciesData.agencies}
                />
                <MapComponent agencies={agenciesData.agencies} />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
