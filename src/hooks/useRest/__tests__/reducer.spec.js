import {
  FETCHING,
  FETCHED,
  ERROR,
} from '../actions';

import sutReducer from '../reducer';

describe('useDataApi reducer', () => {
  let state;
  let action;

  it('should return actual state on FETCHING action type', () => {
    state = {};
    action = {
      type: FETCHING,
    };
    const expected = {
      error: '',
      data: '',
      isLoading: true,
    };
    const actual = sutReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('should return actual state on FETCHED action type', () => {
    state = {};
    action = {
      type: FETCHED,
      payload: 'fetchedPayload',
    };
    const expected = {
      error: '',
      isLoading: false,
      data: action.payload,
    };
    const actual = sutReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('should return actual state on ERROR action type', () => {
    state = {};
    action = {
      type: ERROR,
      payload: 'errorPayload',
    };
    const expected = {
      isLoading: false,
      data: '',
      error: action.payload,
    };
    const actual = sutReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('should throw an ERROR if no action type provided is not supported', () => {
    state = {};
    action = {
      type: 'NOT_SUPPORTED',
    };

    expect(() => sutReducer(state, action)).toThrow();
  });
});
