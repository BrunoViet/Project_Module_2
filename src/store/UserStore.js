import { createStore, combineReducers } from "redux"
import { userReducers } from "../reducers/UserReducers"
import { cartReducers } from "../reducers/CartReducers"
export const fullStore = combineReducers({

    user: userReducers,
    cart: cartReducers
})

const userStore = createStore(fullStore)

export default userStore
