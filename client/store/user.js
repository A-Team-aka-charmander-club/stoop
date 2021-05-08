import axios from 'axios'

const CREATE_USER = 'CREATE_USER'

function createUser(user) {
    return {
        type: CREATE_USER,
        user
    }
}

export function createUserThunk(firebaseUserId) {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`http://localhost:8080/api/users/user`, {firebaseUserId})
            dispatch(createUser(data))
        } catch (err) {
            console.log(err)
        }

    }
}

export default function (state = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            return action.user;
        default:
            return state
    }
}