import { keyframes } from 'styled-components'

export const pulsateGlow = keyframes`
0% {
    --gsize: .35;
}

100% {
    --gsize: .4;
}
`

export const noise = keyframes`
0% {
    clip-path: inset(40% 0 61% 0);
}
20% {
    clip-path: inset(92% 0 1% 0);
}
40% {
    clip-path: inset(43% 0 1% 0);
}
60% {
    clip-path: inset(25% 0 58% 0);
}
80% {
    clip-path: inset(54% 0 7% 0);
}
100% {
    clip-path: inset(58% 0 43% 0);
}
`

export const noise2 = keyframes`
0% {
    clip-path: inset(27% 0 2% 0);
}
20% {
    clip-path: inset(6% 0 23% 0);
}
40% {
    clip-path: inset(19% 0 40% 0);
}
60% {
    clip-path: inset(47% 0 9% 0);
}
80% {
    clip-path: inset(30% 0 77% 0);
}
100% {
    clip: inset(39% 0 21% 0);
}
`