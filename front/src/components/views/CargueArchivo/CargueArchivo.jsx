import React from 'react'
import { useStyles } from '../../../style/style'
import axios from 'axios'
import { useHistory } from 'react-router'

const CargueArchivo = () => {
    const classes = useStyles()
    const { push } = useHistory()
    const onSubmitFile = () => {
    var data = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append("file", imagedata);

      axios.post('http://servicepdcemex.corprevenir.com/api/cargue', data, {headers : {'content-type': 'multipart/form-data'}})
          .then(({ data }) => {
            console.log("Archivo Cargado")
          })
          .catch(({ response }) => {
              console.log("Error Al Cargar")
            
          })

           window.alert("Archivo Cargado...");
           push('/app')
    }
    return (
        <div align="center">
        <form encType="multipart/form-data" action=""  align="center">
             <div align="center">  <h2 >Cargue De Archivo CSV De Resultados</h2>
              <span><input type="file" name="fileName" id="fileName"></input></span>
              </div>
             <div className={classes.div1} >
               <input className="button" type="submit" value="Enviar"  onClick={onSubmitFile} />
             </div>
        </form>
      </div>
    )
}

export default CargueArchivo
