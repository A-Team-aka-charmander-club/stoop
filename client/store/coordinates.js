import axios from 'axios';
import { SECRET } from '@env';
const GET_COORDINATES = 'GET_COORDINATES';

const REMOVE_COORDINATE = 'REMOVE_COORDINATE';

//getCoordinates returns an array of posts
const getCoordinates = (coordinates) => {
  return {
    type: GET_COORDINATES,
    coordinates,
  };
};

export const removeCoordinate = (coordinate) => {
  return {
    type: REMOVE_COORDINATE,
    coordinate,
  };
};

export const getCoordinatesThunk = (region, tags) => {
  return async (dispatch) => {
    console.log(tags);
    try {
      console.log('SECRET', SECRET);
      const { data } = await axios.get(
        // `https://trashpandapirates.herokuapp.com/api/photos/photo`,
        // 'http://localhost:8080/api/photos/photo',
        //'http://192.168.1.152:8080/api/photos/photo',
        //anna's ip address: 192.168.1.152
        `http://10.0.0.153:8080/api/maps/coordinates`,
        {
          params: {
            coordinates: {
              region,
              tags,
            },
          },
          headers: { authorization: SECRET },
        }
      );
      dispatch(getCoordinates(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_COORDINATES:
      return action.coordinates;
    case REMOVE_COORDINATE:
      return state.filter(
        (coordinate) => coordinate.id !== action.coordinate.id
      );
    default:
      return state;
  }
}
