import axios from 'axios'

export const VER_RESULTADO = "VER_RESULTADO"
function VerResultado(){

  return(dispatch, getState) => {
    axios.get("http://localhost:4000/api/resultado")
    .then((response) => dispatch({ type: VER_RESULTADO, payload: response.data}))

  }
}
export default VerResultado