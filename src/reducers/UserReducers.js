const initialState = {
    listUsers: []
}

export const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LIST_USER":
            state.listUsers = action.payload
            return {
                ...state,
                listUsers: state.listUsers
            }

        case "UPDATE_STATUS_USER":
            const newListUsers = state.listUsers.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        userName: action.payload.userName,
                        isEdit: action.payload.isEdit
                    }
                } else {
                    return item
                }
            })
            return {
                ...state,
                listUsers: newListUsers,
            }

        case "DELETE_USER":
            const deleteProduct = state.listUsers.filter(item => item.id !== action.payload)
            return {
                ...state,
                listUsers: deleteProduct
            }

        case "GET_USER_LOGIN_INFO":
            state.listUsers = action.payload
            return {
                ...state,
                listUsers: state.listUsers
            }
        default:
            return state
    }
}