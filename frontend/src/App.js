import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import styles, { GlobalStyles } from 'styles'
import { LandingPage, CreateBearPage, MainPage, LoginPage, NotFoundPage } from 'pages'

const STYLE_SCHEME = 'dark'

const App = () =>
    <ThemeProvider theme={{...styles, ...styles[STYLE_SCHEME]}}>
        <GlobalStyles />
        <HashRouter>
            <Routes>
                <Route exact path='/' element={<LandingPage />}/>
                <Route exact path='/signup' element={<CreateBearPage />}/>
                <Route exact path='/game' element={<MainPage />}/>
                <Route exact path='/login' element={<LoginPage />}/>
                <Route path='/*' element={<NotFoundPage />}/>
                {/* Use Navigate component? */}
            </Routes>
        </HashRouter>
    </ThemeProvider>

export default App
