import axios from 'axios';

import { firebase } from '../../src/firebase/config';

const TAKE_PHOTO = 'TAKE_PHOTO';

const CLEAR_PHOTO = 'CLEAR_PHOTO';

export const takePhoto = (photo) => {
  return {
    type: TAKE_PHOTO,
    photo,
  };
};

export const clearPhoto = () => {
  return {
    type: CLEAR_PHOTO,
    photo: {},
  };
};

// thunks
export const addPhotoThunk = (firebasePhotoId, photoUrl) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;
      const { data } = await axios.post(
        // `https://trashpandapirates.herokuapp.com/api/photos/photo`,
        // 'http://localhost:8080/api/photos/photo',
        //'http://192.168.1.152:8080/api/photos/photo',
        //anna's ip address: 192.168.1.152
<<<<<<< HEAD
        `http://localhost:8080/api/photos/photo`,

=======
<<<<<<< HEAD
        `http://localhost:8080/api/photos/photo`,
=======
        `http://192.168.1.152:8080/api/photos/photo`,
>>>>>>> 9cd67d795a3f274e435aea50baa2a7acc7eab64f
>>>>>>> main
        {
          firebasePhotoId,
          photoUrl,
        },
        {
          headers: { authorization: user.uid },
        }
      );
      dispatch(takePhoto(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case TAKE_PHOTO:
      return action.photo;
    case CLEAR_PHOTO:
      return action.photo;
    default:
      return state;
  }
}
