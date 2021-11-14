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
    width: clamp(300px, 60vw, 30em);
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

    input[type="text"] {
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

export const Roles = styled.div`
    display: grid;
    gap: .2em;
`

export const Role = styled.div`
    font-size: 1.1rem;

    label {
        display: block;
        background: linear-gradient(to right, ${p => p.theme.backgroundSecondary}, transparent);
        padding: .5em;

        &:hover {
            background: linear-gradient(to right, ${p => p.theme.backgroundSecondaryLight}, transparent);
            cursor: pointer;
        }
    }

    &.disabled {
        color: grey;
        text-decoration: line-through;
        label {
            background: linear-gradient(to right, #2c2c2c, transparent);
            cursor: default;
        }
    }

    input[type="radio"] {
        display: none;
    }

    input[type="radio"]:checked + label {
        font-weight: bold;
        background: linear-gradient(to right, ${p => p.theme.primary}, transparent);
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