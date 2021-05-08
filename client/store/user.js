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
            console.log(firebaseUserId, 'fire')
            const { data } = await axios.post('/api/users/user', {firebaseUserId});
            console.log(data, 'data')
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