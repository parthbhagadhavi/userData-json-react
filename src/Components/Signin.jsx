import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signin.css'
function Signin() {
  const [apidata, setApidata] = useState([])
  const nav = useNavigate()
  const [inputdata, setInputdata] = useState({
    email: '', password: ''
  })

  const localdata = JSON.parse(localStorage.getItem('randomkey'))

  // if (localdata) {
  //   nav('/signin')
  // } else {
  //   nav('/')
  // }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = apidata.find(
      (item) => item.email === inputdata.email && item.password === inputdata.password
    );



    if (user) {
      const randomkey = Math.floor(Math.random() * 10000)
      localStorage.setItem("randomkey", JSON.stringify(randomkey))
      nav('/show');
    } else {

      alert("Invalid credentials");
    }

    setInputdata({ email: '', password: '' });
  }


  const handleChange = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <div className="signin-container">
        <h2><i className="fas fa-sign-in-alt"></i> Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="input-group">
            <label><i className="fas fa-envelope"></i> Email</label>
            <input
              type="email"
              name="email"
              value={inputdata.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label><i className="fas fa-lock"></i> Password</label>
            <input
              type="password"
              name="password"
              value={inputdata.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="signin-btn">
            <i className="fas fa-arrow-right-to-bracket"></i> Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signin
