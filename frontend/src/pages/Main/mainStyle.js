import styled from 'styled-components'
import bearImage from 'images/bear.svg'
import thiefImage from 'images/thief.svg'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: .5em;
    gap: .5em;
    max-width: 150vh;
    margin: 0 auto;
`

export const SubtleText = styled.span`
    color: grey;
    font-style: italic;
    padding-bottom: .1em;
`

export const HighlightText = styled.span`
    color: ${p => p.theme.primaryLight};
`

export const Box = styled.div`
    display: flex;
    gap: .1em;
    height: 6.5em;
    background: ${p => p.theme.backgroundSecondary};
    font-family: ${p => p.theme.featureFont};
    font-size: 2.3rem;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;

    &.small {
        background: radial-gradient(${p => p.theme.backgroundSecondaryLight} 1%, ${p => p.theme.backgroundSecondary} 80%);
        font-size: 1.3rem;
        height: max-content;
        padding: 1.5em 0em;
    }

    &.medium {
    }

    &.subtle {
      background: ${p => p.theme.backgroundSecondary};
      opacity: 60%;
    }

    &.warning {
        background: radial-gradient(#af4242 1%,#6a2626 80%);
        span {
            color: #dd7f7f;
        }
    }
`

export const SkillSliderContainer = styled.div`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;

    gap: .5em;
    width: 100%;
    height: 14vw;

    > * {
        flex-grow: 1;
        width: calc(100% / var(--count));
    }
`

export const SkillBox = styled.div`
    background-color: ${p => p.theme.backgroundSecondaryLight}; /*66666666*/
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: overlay;
    background-size: 70%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    text-align: center;
    
    cursor: pointer;
    font-size: 10vw;
    mix-blend-mode: lighten;
    font-family: ${p => p.theme.featureFont};

    &.active {
        background-color: ${p => p.theme.primary};
    }

    &.start {
        background-image: url(${bearImage});
        background-position: 60% 40%;
        background-size: 75%;
    }

    &.end {
        background-image: url(${thiefImage});
    }

    span {
        display: flex;
        background: radial-gradient(#bdbdbdeb, transparent);
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
`

export const NotesContainer = styled.div`
    display: flex;
    gap: .1em;
    height: 6.5em;
    background: ${p => p.theme.backgroundSecondary};
    font-family: ${p => p.theme.featureFont};
    font-size: 2.5rem;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`

export const NotesArea = styled.textarea`
    display: block;
    width: 100%;
    height: 100%;
    resize: none;
    padding: .8em;
    border-radius: .2rem;
    box-sizing: border-box;
    border: none;
    outline: none;
    background: ${p => p.theme.backgroundSecondaryLight};
    color: white;

    ::placeholder {
        color: #a1a1a1;
    }
`

export const Button = styled.button`
  background: ${p => p.theme.backgroundSecondaryLight};
  font-family: ${p => p.theme.featureFont};
  width: 40%;
  padding: 0.5em 0em;
  font-size: 1.2em;
  border: none;
  color: white; 
  cursor: pointer;

  &:hover {
    background: #767676;
  }

  &:active {
    background: white;
    color: ${p => p.theme.backgroundSecondaryLight};
  }
`

export const PartyBoxContainer = styled(Box)`
    font-size: 2rem;
    text-align: left;
    align-items: flex-start;
    padding-left: 1em;
    height: max-content;
    padding: 1em;

    h3 {
      margin-bottom: .2em;
      margin-top: 0;
    }
`


export const PartyTable = styled.table`
  border-collapse: collapse;
  font-size: 1.5rem;
  margin-left: 1em;
  margin-top: .5em;

  thead {
    font-weight: bold;
    border-bottom: 3px solid ${p => p.theme.backgroundSecondaryLight};
  }

  td {
    padding: .3em;
  }

  tbody {
    tr:first-child {
      td {
        padding-top: .8em;
      }
    }
  }
`
