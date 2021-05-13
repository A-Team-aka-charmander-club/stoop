import axios from 'axios';
import { firebase } from '../../src/firebase/config';
const ADD_PHOTO = 'ADD_PHOTO';

const addPhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    photo,
  };
};

export const addPhotoThunk = (firebasePhotoId, photoUrl) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;
      const { data } = await axios.post(
        //`https://trashpandapirates.herokuapp.com/api/photos/photo`,
        `https://localhost:8080/api/photos/photo`,
        {
          firebasePhotoId,
          photoUrl,
        },
        {
          headers: { authorization: user.uid },
        }
      );
      dispatch(addPhoto(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return action.photo;
    default:
      return state;
  }
}
