export const VER_RESULTADO = "VER_RESULTADO"
function VerResultado(){

    const users=[
        {id: 1, name: 'alinton'}
    ]

  return {
    type: VER_RESULTADO,
    payload: users
  }
}
export default VerResultado