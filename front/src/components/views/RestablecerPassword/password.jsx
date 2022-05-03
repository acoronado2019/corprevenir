import React, { useState } from 'react'
import { Grid, Container, Paper, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import fondo from './fondo.jpg'
import axios from 'axios'
import { useHistory } from 'react-router'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
    },
    container: {
        height: '60%',
        marginTop: theme.spacing(10),
        [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
            marginTop: 0,
            width: '100%',
            height: '100%'
        }
    },
    div: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#fcc404'
        }
      },
});

const Login = () => {
    const [body, setBody] = useState({ username: '', password: '' })
    const { push } = useHistory()
    const classes = useStyles()
    const session = JSON.parse(localStorage.getItem('session'))
    body.username=session.name;
    console.log(session)
    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }

    const onSubmit = () => {
        axios.post('http://service.pdcemex.corprevenir.com/api/updatePassword', body)
            .then(({ data }) => {
                localStorage.setItem('session', JSON.stringify(data))
                localStorage.setItem('auth', '"yes"')
                push('/app')
            })
            .catch(({ response }) => {
                window.alert(response.data);
                console.log(response.data)
            })
    }

    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
                <div className={classes.div}>
                    <form className={classes.form}>
                        <TextField
                            fullWidth
                            autoFocus
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Contraseña Actual'
                            value={body.password}
                            onChange={inputChange}
                            name='password'
                        />
                        <TextField
                            fullWidth
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Nueva Contraseña'
                            value={body.newPassword}
                            onChange={inputChange}
                            name='newPassword'
                        />
                        <TextField
                            fullWidth
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Confirmar Contraseña'
                            onChange={inputChange}
                            name='passwordConfirm'
                        />
                         <ThemeProvider theme={theme}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            className={classes.button}
                            onClick={onSubmit}
                        >
                            Cambiar contraseña
                        </Button>
                        </ThemeProvider>
                    </form>
                </div>
            </Container>
        </Grid>
    )
}

export default Login
