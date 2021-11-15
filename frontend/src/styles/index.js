const styles = {
    dark: {
        primary: '#19aaeb',
        primaryLight: '#93d5f3',

        background: '#222222',
        backgroundSecondary: '#424242',
        backgroundSecondaryLight: '#585858',

        text: '#EEEEEE',
        greyText: '#BBBBBB',

        buttonInactive: '#3F3F3F',
        fieldBorder: '#555555',
        fieldBackground: '#141414',

        bodyFont: 'Open Sans',
        featureFont: 'Josefin Sans',

        error: '#ff7979',

        glow: `0 0 calc(var(--gsize) * .2rem) #fff,
        0 0 calc(var(--gsize) * .2rem) #fff,
        0 0 calc(var(--gsize) * 2rem) var(--gcol),
        0 0 calc(var(--gsize) * 0.8rem) var(--gcol),
        0 0 calc(var(--gsize) * 2.8rem) var(--gcol),
        inset 0 0 calc(var(--gsize) * 1.3rem) var(--gcol);`
    },
}

export { default as GlobalStyles } from './global'

export default styles