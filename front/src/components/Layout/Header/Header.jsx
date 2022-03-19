import React from 'react'
import { AppBar, IconButton, Typography, Button, Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router'
import { Menu as MenuIcon } from '@material-ui/icons'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const Header = ({ setOpen }) => {
    const history = useHistory()
    const theme = createMuiTheme({
        palette: {
            secondary: {
                main: '#fcc404'
            }
          },
    });
    return (
        <ThemeProvider theme={theme}>
        <AppBar color='secondary'>
            <Toolbar>
                <IconButton edge='start' color='inherit' onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography style={{ flexGrow: 1 }}>CARGUE DE DATOS PUNTOS DORADOS</Typography>
                <Button variant='text' color='inherit' onClick={() => {
                    localStorage.clear()
                    history.push('/login')
                }}>Cerrar Sesión</Button>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header
