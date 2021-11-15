import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: ${p => p.theme.bodyFont};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: ${p => p.theme.background};
        color: ${p => p.theme.text};
        -webkit-print-color-adjust: exact;
    }

    body, #root {
        min-height: 100vh;
        --vh: ${window.innerHeight / 100}px;
    }

    #root {
        display: flex;
        flex-direction: column;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${p => p.theme.featureFont};
    }

    a {
        color: ${p => p.theme.primary};
    }
`

// Custom vh units
window.addEventListener('resize', () => { 
    document.querySelector('#root').style
      .setProperty('--vh', `${window.innerHeight/100}px`);
  })

export default GlobalStyles