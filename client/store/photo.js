import axios from 'axios';

import { firebase } from '../../src/firebase/config';

const TAKE_PHOTO = 'TAKE_PHOTO';

const CLEAR_PHOTO = 'CLEAR_PHOTO';

export const takePhoto = (photo) => {
  console.log(photo, 'photo');
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

export const addPhotoThunk = (firebasePhotoId, photoUrl) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;
      const { data } = await axios.post(
        `https://trashpandapirates.herokuapp.com/api/photos/photo`,

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
