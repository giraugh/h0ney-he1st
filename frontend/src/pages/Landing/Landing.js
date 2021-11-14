import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Container, GlitchHeading, StyledLink, Footer } from './landingStyle'

const TEXT_DELAY = 150 // ms

const Landing = () => {

    return <Container>
        <Heading text='H0ney He1st' className='glitch' />
        <StyledLink to='/signup'>Get Started</StyledLink>
        <Footer>Created by <Link to='http://ewanb.me'>Ew4n Br3akey</Link>
        {' and ' }<Link to='maxwellreid.tech'>Maxw3ll Re1d</Link></Footer>
    </Container>
}

const Heading = ({ text, ...rest }) => {
    const [char, setChar] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setChar(char + 1)
        }, TEXT_DELAY)
        return () => clearInterval(timer)
    })

    const currentText = text
        .slice(null, char)
        .split('')
        .map(c => "01".includes(c) ? (Math.random() < .05 ? c.replace('0', 'o').replace('1', 'i') : c) : c)
        .join('')

    return <GlitchHeading data-text={currentText} {...rest}>{currentText}</GlitchHeading>
} 

export default Landing