import "./App.css";
import LoginPage from "./LoginPage";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapComponent from "./MapComponent"; // Import the AgencyMap component
import agenciesData from "./agencies.json"; // Import your JSON data
import Filter from "./Filter.js";
import Home from "./pages/Home/Home";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import Disaster from "./Disaster";
import Chat from "./pages/Chat/Chat";

function App() {
  const [filteredAgencies, setFilteredAgencies] = useState(agenciesData.agencies);

  const handleSearch = (searchText) => {
    console.log("Searching for:", searchText);

    const filtered = agenciesData.agencies.filter((agency) =>
      agency.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(filtered);
    if (filteredAgencies.length === 0) {
      toast.error('No agency found!');
      setFilteredAgencies(agenciesData.agencies);
    }
    else{
      setFilteredAgencies(filtered);
    }
  };
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/register" element={<RegistrationForm/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/add-disaster" element={<Disaster/>} />
          <Route exact path="/chat" element={<Chat />} />
          <Route
            exact
            path="/map"
            element={
              <div>
                <Filter
                  onSearch={handleSearch}
                  agencies={agenciesData.agencies}
                />
                <MapComponent agencies={filteredAgencies}/>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
