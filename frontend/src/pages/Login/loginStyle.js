import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: ${p => p.theme.featureFont};
    margin-top: 1em;
`

export const Heading = styled.h1`
    color: #FFF;
`

export const Form = styled.form`
    width: clamp(300px, 50vw, 20em);
    padding: 1.5em;
    border: .2rem solid white;
    border-radius: .5rem;

    /* Glow Effect */
    --gcol: ${p => p.theme.primary};
    --gsize: .4;
    box-shadow: ${p => p.theme.glow};

    input[type="submit"] {
        width: 100%;
        padding: .5em;
        font-size: 1.2rem;
        font-family: ${p => p.theme.featureFont};
        margin-top: .5em;
    }
`

export const Field = styled.div`
    display: flex;
    gap: .2em;
    flex-direction: column;
    margin-bottom: 1em;

    input[type="text"], input[type="number"] {
        padding: .4em;
    }

    label {
        font-size: 1.2rem;
    }

    p {
        margin: 0;
        color: grey;
        font-style: italic;
        margin: 0.1em;
        margin-bottom: 0.2em;
        font-family: ${p => p.theme.bodyFont};
    }
`

export const ErrorField = styled.span`
    color: ${p => p.theme.error};
    padding: .2em;
`

export const StyledLink = styled(Link)`
    color: darkgrey;
    font-style: italic;
    display: inline-block;
    padding-top: 1em;
    width: 100%;
    text-align: center;
`
