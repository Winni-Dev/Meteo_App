import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import RealTimeClock from './RealTimeClock'
import Yasmine from './Clients/Yasmine'
import Garcon from './Clients/Garcon'
import Winni from './Clients/Winni';
import Charo from './Clients/Charo';
// Redeploy Vercel SPA


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Winni/>} />
        <Route path='/Yayou' element={<Yasmine/>} />
        <Route path='/Garcon' element={<Garcon/>} />
        <Route path='/Charo' element={<Charo/>} />
      </Routes>
     {/* <RealTimeClock/> */}
    </div>
  )
}

export default App
