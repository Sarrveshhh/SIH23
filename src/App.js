import "./App.css";
import LoginPage from "./LoginPage";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapComponent from "./MapComponent"; // Import the AgencyMap component
import agenciesData from "./agencies.json"; // Import your JSON data
import Filter from "./Filter.js";
import Home from "./pages/Home/Home";
import { useState } from "react";

import Disaster from "./Disaster";

function App() {
  const [filteredAgencies, setFilteredAgencies] = useState(
    agenciesData.agencies
  );

  const handleSearch = (searchText) => {
    console.log("Searching for:", searchText);

    const filtered = agenciesData.agencies.filter((agency) =>
      agency.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Update the filtered agencies
    setFilteredAgencies(filtered);
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
            path="/test"
            element={<Disaster agencies={filteredAgencies} />}
          />
          <Route
            exact
            path="/map"
            element={
              <div>
                <Filter
                  onSearch={handleSearch}
                  agencies={agenciesData.agencies}
                />
                <MapComponent agencies={filteredAgencies} />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
