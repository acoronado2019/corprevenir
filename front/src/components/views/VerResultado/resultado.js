import {VER_RESULTADO} from '../VerResultado'
const initialState = {
list: []
}
function VerResultado(state= initialState, action){

    switch(action.type){
        case VER_RESULTADO:
            return Object.assign({}, state, {list: action.payload})
        default:
            return state
    }

  
}
export default VerResultado