import axios from 'axios';

import { firebase } from '../../src/firebase/config';

const ADD_TAGS = 'ADD_TAGS';

const REMOVE_TAGS = 'REMOVE_TAGS';

export const addTags = (tags) => {
  return {
    type: ADD_TAGS,
    tags,
  };
};

export const removeTags = () => {
  return {
    type: REMOVE_TAGS,
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case ADD_TAGS:
      return action.tags;
    case REMOVE_TAGS:
      return [];
    default:
      return state;
  }
}
