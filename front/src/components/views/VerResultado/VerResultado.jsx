import React, { useState, useEffect } from 'react'
import { useStyles } from '../../../style/style'
import axios from 'axios'
import MaterialTable, {MTableBody} from "material-table";
import { TableCell, TableFooter, TableRow } from "@material-ui/core";

const columns= [
  { title: 'Cedula', field: 'cedula', filtering: false },
  { title: 'Año', field: 'anno', type: 'numeric' },
  { title: 'Trimestre', field: 'trimestre', type: 'numeric' },
  { title: 'item', field: 'item', filtering: false},
  { title: 'puntos', field: 'puntos', filtering: false}

];


function VerResultado  () {
  const classes = useStyles()
  const [data, setData]= useState([]);
  const peticionGet=async()=>{
    const idPersona = JSON.parse(localStorage.getItem('session')).idpersona
    const idRol = JSON.parse(localStorage.getItem('session')).idRol
    await axios.get(`http://localhost:4000/api/resultado/${idPersona}${idRol}`)
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
      {data && <MaterialTable
        columns={columns}
        data={data}
        title="Resultado de Pruebas Aplicadas"
        options={{
          filtering: true
        }}
        components={{
          Body: (props) => (
            <>
              <MTableBody {...props}/>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}/>
                  <TableCell colSpan={1} style={{ fontWeight: 600 }}>Total: {JSON.stringify(props.renderData.map(item => item.puntos).reduce((prev, curr) => prev + curr, 0))}</TableCell>
                </TableRow>
              </TableFooter>
            </>
          )
        }}
      />
      }
    </div>
  )
}

export default VerResultado
