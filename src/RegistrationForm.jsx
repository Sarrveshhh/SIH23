import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import expertise from './expertise.json';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phoneNumber: '',
    email: '',
    expertise: [], // drop down
    securityQuestion: '', // text
    licenseNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    // If the field is "expertise," add or remove the selected option from the array
    // If it's any other field, store the value as usual
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === 'expertise'
          ? checked
            ? [...prevData.expertise, value]
            : prevData.expertise.filter((item) => item !== value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log(formData);
  };

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const Login =()=>{
    navigate('/');
  }

  return (
    <div className="registration-form-container w-1/2 mx-auto p-4 border mt-10 mb-10 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4 ">
          <button
            className="flex mx-auto justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Choose Area of Expertise
            {!isOpen ? (
              <BiSolidDownArrow className="ml-2"></BiSolidDownArrow>
            ) : (
              <BiSolidUpArrow className="ml-2"></BiSolidUpArrow>
            )}
          </button>
          {isOpen && (
            <div>
              {expertise.map((item, i) => (
                <div key={i}>
                  <h3>{item.aoe}</h3>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Security Question</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            type="text"
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">License Number</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
          
          <p className='hover:cursor-pointer mt-2' onClick={()=> Login()}>Already registered? Login</p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
