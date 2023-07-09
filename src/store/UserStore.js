import { createStore, combineReducers } from "redux"
import { userReducers } from "../reducers/UserReducers"
import { productReducers } from "../reducers/ProductReducers"
export const fullStore = combineReducers({

    user: userReducers,
    products: productReducers
})

const userStore = createStore(fullStore)

export default userStore
