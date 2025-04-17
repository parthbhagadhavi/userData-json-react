import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './EditData.css'

function EditData() {
  const { state } = useLocation()
  const nav = useNavigate()

  const localdata=JSON.parse(localStorage.getItem('randomkey'))

  useEffect(()=>{
    if(localdata){
      nav('/edit')
        }else{
            nav('/')
        }
       
  },[nav])
 

  const [inputdata, setInputdata] = useState({
    email: state?.email || '',
    password: state?.password || ''
  })

  const handleChange = (e) => {
    setInputdata({
      ...inputdata,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const ApiKey = `http://localhost:3000/logindata/${state.id}`;
      const response = await axios.put(ApiKey, inputdata);
      console.log("Updated:", response.data);
      nav('/'); 
    } catch (err) {
      console.error("Update failed:", err);
    }
  }

  return (
    <div>
       <div className="edit-container">
      <h2><i className="fas fa-pen-to-square"></i> Edit Data</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          <i className="fas fa-envelope"></i> Email:
        </label>
        <input
          type="email"
          name="email"
          value={inputdata.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <label>
          <i className="fas fa-lock"></i> Password:
        </label>
        <input
          type="password"
          name="password"
          value={inputdata.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <button type="submit">
          <i className="fas fa-save"></i> Save Changes
        </button>
      </form>
    </div>
    </div>
  )
}

export default EditData
