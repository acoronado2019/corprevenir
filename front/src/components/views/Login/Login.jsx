import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import axios from 'axios'
import { useHistory } from 'react-router'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  
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

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }

    const onSubmit = () => {
        axios.post('http://servicepdcemex.corprevenir.com/api/login', body)
            .then(({ data }) => {
                console.log(data)
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
        <Grid container component='main'>
            <CssBaseline />
            <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
                <div className={classes.div}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                   
                    <form className={classes.form}>
                        <TextField
                            fullWidth
                            autoFocus
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Username'
                            value={body.username}
                            onChange={inputChange}
                            name='username'
                        />
                        <TextField
                            fullWidth
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Password'
                            value={body.password}
                            onChange={inputChange}
                            name='password'
                        />
                          <ThemeProvider theme={theme}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            className={classes.button}
                            onClick={onSubmit}
                        >
                           Iniciar sesi??n
                        </Button>
                        </ThemeProvider>
                    </form>
                </div>
            </Container>
        </Grid>
    )
}

export default Login
