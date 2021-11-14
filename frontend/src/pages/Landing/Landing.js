import React, { useEffect, useState } from 'react'

import { Container, GlitchHeading, StyledLink, Footer } from './landingStyle'

const TEXT_DELAY = 150 // ms

const Landing = () => {

    return <Container>
        <Heading text='H0ney He1st' className='glitch' />
        <StyledLink to='/signup'>Get Started</StyledLink>
        <Footer>
            {'Created by '}
            <a href='https://ewanb.me' target='_blank' rel='noreferrer'>Ew4n Br3akey</a>
            {' and ' }
            <a href='https://maxwellreid.tech' target='_blank' rel='noreferrer'>Maxw3ll Re1d</a>
        </Footer>
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