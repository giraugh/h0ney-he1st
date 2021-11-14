import React, { useEffect, useState } from 'react'

import { Container, GlitchHeading, StyledLink } from './landingStyle'

const Landing = () => {

    return <Container>
        <Heading text='H0ney He1st' className='glitch' />
        <StyledLink to='/signup'>Get Started</StyledLink>
    </Container>
}

const Heading = ({ text, ...rest }) => {
    const [char, setChar] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setChar(char + 1)
        }, 100)
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