import axios from 'axios';
// ACTION CONSTANTS
const CREATE_USER = 'CREATE_USER';

const LOGOUT_USER = 'LOGOUT_USER';

//ACTION CREATORS
function createUser(user) {
  return {
    type: CREATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    user: {},
  };
}
// THUNK
export function createOrFindUserThunk(user) {
  return async (dispatch) => {
    try {
      // `https://trashpandapirates.herokuapp.com/api/users/user`,
      //`https://localhost:8080/api/users/user`
      //`http://192.168.1.152:8080/api/users/user`
      const { data } = await axios.post(
        // `https://trashpandapirates.herokuapp.com/api/users/user`,
<<<<<<< HEAD
        `http://localhost:8080/api/users/user`,
=======
        `http://192.168.1.152:8080/api/users/user`,
>>>>>>> c499f0d68116acedb3ea2758701781e9df734826
        {
          user,
        }
      );
      dispatch(createUser(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.user;
    case LOGOUT_USER:
      return action.user;
    default:
      return state;
  }
}
