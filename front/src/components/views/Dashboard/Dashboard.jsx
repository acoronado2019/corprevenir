import React from 'react'
import { Typography, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

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
        alignItems: 'center',
        color:'black',
        textShadow: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff'
    }
    ,
    textName: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color:'black',
        textShadow: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff'
    }
}))
const Dashboard = () => {
    const classes = useStyles()
    const session = JSON.parse(localStorage.getItem('session'))
    return (
        <Grid >
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
