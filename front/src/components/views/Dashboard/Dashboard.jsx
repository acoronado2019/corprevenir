import React from 'react'
import { Typography, Grid} from '@material-ui/core'
import fondo from './fondo.jpg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
    },
    div: {
        marginTop: theme.spacing(-15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        marginTop: theme.spacing(35),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    ,
    textName: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))
const Dashboard = () => {
    const classes = useStyles()
    const session = JSON.parse(localStorage.getItem('session'))
    return (
        <Grid className={classes.root}>
          <div className={classes.div}>
            <Typography className={classes.text} variant='h3'>Bienvenido</Typography>
        </div>
        <div className={classes.div}>
            <Typography className={classes.textName} variant='h3'>{session.nombre_completo}</Typography>
        </div>
        </Grid>
    )
}

export default Dashboard
