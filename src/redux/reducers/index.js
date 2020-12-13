import {combineReducers} from 'redux';
import filterReducer from './filter';
import cartReducer from './cart'

const rootReducer = combineReducers({
    filters: filterReducer,
    cart: cartReducer,
})

export default rootReducer