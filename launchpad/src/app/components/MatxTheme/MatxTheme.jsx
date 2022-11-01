import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import MatxCssVars from './MatxCssVars'
import useSettings from 'app/hooks/useSettings'
import { ToastContainer } from 'react-toastify'
import { GlobalCss } from '../index'

const MatxTheme = ({ children }) => {
    const { settings } = useSettings()
    let activeTheme = { ...settings.themes[settings.activeTheme] }
    return (
        <ThemeProvider theme={activeTheme}>
            <ToastContainer autoClose={5000} />
            <GlobalCss />
            <CssBaseline />
            <MatxCssVars> {children} </MatxCssVars>
        </ThemeProvider>
    )
}

export default MatxTheme
