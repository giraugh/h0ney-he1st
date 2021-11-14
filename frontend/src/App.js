import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { CreateBearPage, MainPage, LoginPage } from 'pages'

const App = () =>
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<CreateBearPage />}/>
      <Route exact path='/game' element={<MainPage />}/>
      <Route exact path='/login' element={<LoginPage />}/>
    </Routes>
  </BrowserRouter>
export default App