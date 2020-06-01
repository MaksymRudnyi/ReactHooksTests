import {
  FETCHING,
  FETCHED,
  ERROR,
} from './actions';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        error: '',
        data: '',
        isLoading: true,
      };
    case FETCHED:
      return {
        ...state,
        error: '',
        isLoading: false,
        data: action.payload,
      };
    case ERROR:
      return {
        ...state,
        isLoading: false,
        data: '',
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

export default dataFetchReducer;
