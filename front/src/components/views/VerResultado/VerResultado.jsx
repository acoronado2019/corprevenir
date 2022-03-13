import React, { useState, useEffect } from 'react'
import { useStyles } from '../../../style/style'
import axios from 'axios'
import MaterialTable from "material-table";

const columns= [
  // { title: 'Id', field: 'id' },
  { title: 'Cedula', field: 'cedula' },
  { title: 'Año', field: 'anno', type: 'numeric' },
  { title: 'cargo', field: 'cargo'},
  { title: 'email', field: 'email'},
  { title: 'item', field: 'item'},
  { title: 'puntos', field: 'puntos'},
 // { title: 'Fecha Cargue', field: 'fecha_cargue'}

];


function VerResultado  () {
  const classes = useStyles()
  const [data, setData]= useState([]);
  //const { push } = useHistory()

  const peticionGet=async()=>{
    const idPersona = JSON.parse(localStorage.getItem('session')).idpersona
    await axios.get(`http://localhost:4000/api/resultado/${idPersona}`)
      .then(response=>{
        console.log(response.data)
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
  }

  useEffect(()=>{
    peticionGet();
  }, [])


  return (
    <div className={classes.div} align="center">
      <MaterialTable
        columns={columns}
        data={data}
        title="Resultado de Pruebas Aplicadas"
      />
    </div>
  )
}

export default VerResultado