import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddData.css'
function AddData() {
  const [inputdata, setInputdata] = useState({
    email: '',
    password: ''
  });
  const nav = useNavigate()

  const localdata = JSON.parse(localStorage.getItem('randomkey'))
useEffect(()=>{
  if (localdata) {
    nav('/addData')
  } else {
    nav('/')
  }
},[nav])
 


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataWithId = {
      id: Math.floor(Math.random() * 1000),
      ...inputdata
    };

    try {
      const ApiKey = "http://localhost:3000/logindata";
      const response = await axios.post(ApiKey, dataWithId);
      console.log("Data saved:", response.data);
      nav('/')
    } catch (error) {
      console.error("Error saving data:", error);
    }

    // Reset form
    setInputdata({ email: '', password: '' });
  };

  const handleChange = (e) => {
    setInputdata({
      ...inputdata,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="add-container">
        <h2><i className="fas fa-user-plus"></i> Add New User</h2>
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label><i className="fas fa-envelope"></i> Email:</label>
            <input
              type="email"
              name="email"
              value={inputdata.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label><i className="fas fa-lock"></i> Password:</label>
            <input
              type="password"
              name="password"
              value={inputdata.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="add-btn">
            <i className="fas fa-plus-circle"></i> Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddData;
