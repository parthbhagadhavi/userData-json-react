import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const [apidata, setApidata] = useState([])
  const nav = useNavigate()

  const localdata = JSON.parse(localStorage.getItem('randomkey'))

  useEffect(()=>{
    if (localdata) {
      nav('/show')
    } else {
      nav('/')
    }
  },[nav])





  const FetchApi = async () => {
    const ApiKey = "http://localhost:3000/logindata"
    const data = await axios.get(ApiKey)
    const result = data.data;
    setApidata(result)
    console.log(apidata);


  }

  useEffect(() => {
    FetchApi()
  }, [])


  const handleDelete = async (item) => {
    const ApiKey = `http://localhost:3000/logindata/${item.id}`;
    const data = await axios.delete(ApiKey, item)
    FetchApi()
  }

  const handleLogout=()=>{
    
    localStorage.removeItem("randomkey")
    nav('/')
  }

  return (
    <div>
      <div className="home-container">
        <div className="header">
          <h2>Welcome to Dashboard</h2>
          <button style={{ width: '15%' }} className="add-btn" onClick={() => nav('/adddata')}>
            <i className="fas fa-plus"></i> Add Data
          </button>
          <button
      onClick={handleLogout}
      className="remove-account-btn"
    >
     <img src="https://cdn-icons-png.flaticon.com/128/4400/4400828.png" height='35px' alt="" />
      Remove Account
    </button>
        </div>
        <div className="card-container">
          {apidata.map((item, index) => (
            <div className="user-card" key={index}>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Password:</strong> {item.password}</p>
              <div className="card-actions">
                <button onClick={() => nav('/edit', { state: item })}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button onClick={() => handleDelete(item)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
