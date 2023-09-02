import './App.css';
import LoginPage from './components/LoginPage';
import RegistrationForm from './RegistrationForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage/>} />
          <Route exact path='/register' element={<RegistrationForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
