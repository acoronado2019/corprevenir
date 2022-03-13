import React from 'react'
import { useStyles } from '../../../style/style'
import axios from 'axios'
import { useHistory } from 'react-router'

const CargueArchivo = () => {
    const classes = useStyles()
    const { push } = useHistory()
    const onSubmitFile = () => {
      console.log("llega onSubmitFile")
      var data = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append("file", imagedata);

      axios.post('http://localhost:4000/api/cargue', data, {headers : {'content-type': 'multipart/form-data'}})
          .then(({ data }) => {
              push('/app')
          })
          .catch(({ response }) => {
              console.log(response.data)
          })

    }
    return (
        <div className={classes.div} align="center">
        <form encType="multipart/form-data" action="" align="center">
          <table className="table" align="center">
            <tbody>
            <tr align="center">
              <td><h2 className="h2">Cargue De Archivo CSV</h2></td>
            </tr>
            <tr>
              <td>
                <input type="file" name="fileName" id="fileName"></input>
              </td>
            </tr>
            <tr align="center">
              <td>
                <input className="button" type="submit" value="Enviar"  onClick={onSubmitFile} />
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
}

export default CargueArchivo
