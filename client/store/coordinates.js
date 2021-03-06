import axios from 'axios';
import { SECRET } from '@env';
const GET_COORDINATES = 'GET_COORDINATES';

const REMOVE_COORDINATE = 'REMOVE_COORDINATE';

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
    try {
      const { data } = await axios.get(
        `https://trashpandapirates.herokuapp.com/api/maps/coordinates`,

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
