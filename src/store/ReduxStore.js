import { createStore, combineReducers } from "redux"
import { userReducers } from "../reducers/UserReducers"
import { cartReducers } from "../reducers/CartReducers"
import { orderReducers } from "../reducers/OrderReducers"
export const fullStore = combineReducers({

    user: userReducers,
    cart: cartReducers,
    order: orderReducers
})

const reduxStore = createStore(fullStore)

export default reduxStore
