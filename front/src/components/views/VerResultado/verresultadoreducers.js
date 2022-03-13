import {combineReducers} from 'redux'
import {verResultado} from '../VerResultado'

const rootReducer = combineReducers({
resultado: verResultado
});

export default rootReducer;