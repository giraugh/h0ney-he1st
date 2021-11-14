import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { pulsateGlow, noise, noise2 } from 'styles/animations'

export const StyledLink = styled(Link)`
    font-size: 2rem;
    font-family: 'Josefin Sans';
    padding: 0.5em;
    background: transparent;
    color: white;
    text-decoration: none;
    
    /* Glow Effect */
    border: 1px solid white;
    --gcol: ${p => p.theme.primary};
    --gsize: .4;
    box-shadow: ${p => p.theme.glow};
    animation: ${pulsateGlow} .7s infinite linear alternate-reverse;
`

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const GlitchHeading = styled.h1`
    font-size: min(12vw, 8rem);

    /* Glitch Effect */
    position: relative;
    &::before, &::after { 
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    &::before {
        left: -.2rem;
        text-shadow: -.2rem 0 ${p => p.theme.primary};
        animation: ${noise} 2s infinite linear alternate-reverse;
        background: ${p => p.theme.background};
    }
    &::after {
        left: .2rem;
        text-shadow: .2rem 0 ${p => p.theme.primary};
        animation: ${noise2} 2s infinite linear alternate-reverse;
        background: ${p => p.theme.background};
    }
`