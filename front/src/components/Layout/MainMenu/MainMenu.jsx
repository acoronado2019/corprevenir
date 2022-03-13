import React from 'react'
import { Drawer, Paper, IconButton, Divider, MenuItem } from '@material-ui/core'
import { useStyles } from '../../../style/style'
import { useHistory } from 'react-router'
import { Menu as MenuIcon } from '@material-ui/icons'
import Logo from '../icon.jpg'


const MainMenu = ({ open, setOpen }) => {
    const classes = useStyles()
    const { push } = useHistory()
    const session = JSON.parse(localStorage.getItem('session'))

    return (
        <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
            <Paper className={classes.paper} elevation={0}>
                <div className={classes.div}>
                    <IconButton edge='start' color='inherit' onClick={() => setOpen(false)}>
                        <MenuIcon />
                    </IconButton>
                    <img src={Logo} alt='...' className={classes.logo} />
                </div>
                <Divider />
            </Paper>
            <MenuItem onClick={() => push('/app')}>Inicio</MenuItem>
            {session.rol_id === 1 && < MenuItem onClick={() => push('/cargue')}>Cargar Archivo</MenuItem>}
            {session.rol_id === 2 && <MenuItem onClick={() => push('/resultado')}>Ver Resultado</MenuItem>}
            <MenuItem>Actualizar Contraseña</MenuItem>
        </Drawer>
    )
}

export default MainMenu
