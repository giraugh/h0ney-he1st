import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import styles, { GlobalStyles } from 'styles'
import { LandingPage, CreateBearPage, MainPage, LoginPage } from 'pages'

const STYLE_SCHEME = 'dark'

const App = () =>
  <ThemeProvider theme={{...styles, ...styles[STYLE_SCHEME]}}>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />}/>
        <Route exact path='/signup' element={<CreateBearPage />}/>
        <Route exact path='/game' element={<MainPage />}/>
        <Route exact path='/login' element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>

export default App