import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './Components/Home'
import Signin from './Components/Signin'
import AddData from './Components/AddData'
import EditData from './Components/EditData'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/show' element={<Home />} />
        <Route path='/adddata' element={<AddData />} />
        <Route path='/edit' element={<EditData />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
