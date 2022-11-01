const textDark = {
    primary: '#FFFFFF',
    secondary: '#EEEEEE',
    disabled: '#878787',
    hint: '#878787',
}
const errorColor = {
    main: '#FF3D57',
}

export const themeColors = {
    main: {
        palette: {
            type: 'dark',
            primary: {
                main: '#6ddc00',
                // main: '#bf1e2e',
                contrastText: '#ffffff',
            },
            secondary: {
                main: '#ede9dd',
                contrastText: '#000000',
            },
            background: {
                default: '#15202b',
                paper: '#1a2e3b',
            },
            error: errorColor,
            text: textDark,
        },
    },
}
