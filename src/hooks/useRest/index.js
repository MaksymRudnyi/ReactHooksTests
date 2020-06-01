import {
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';

import {
  FETCHING,
  FETCHED,
  ERROR,
} from './actions';
import dataFetchReducer from './reducer';
import agent from './agent';

const useRest = (initialUrl = '', initialData = '') => {
  const [ {
    url,
    method,
    data,
  }, setConfig ] = useState({
    url: initialUrl,
    method: 'get',
    data: initialData,
  });

  const [ state, dispatch ] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: '',
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    (async () => {
      dispatch({ type: FETCHING });

      if (!url) {
        return undefined
      }

      try {
        const result = await agent[method]({
          url,
          ...method === 'post' && { data },
          config: {
            timeout: 1000,
          },
        });

        if (!didCancel) {
          dispatch({
            type: FETCHED,
            payload: result.data,
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({
            type: ERROR,
            payload: error.response ? error.response.data || error.response.error : { message: 'Error' },
          });
        }
      }
    })();

    return () => {
      didCancel = true;
    };
  }, [ url, method, data ]);

  const doFetch = useCallback((fetchUrl) => {
    setConfig({ method: 'get', url: fetchUrl });
  }, []);

  const doSend = useCallback((sendUrl, sendData) => {
    setConfig({
      method: 'post',
      url: sendUrl,
      data: { ...sendData },
    });

  }, []);

  return {
    ...state,
    doFetch,
    doSend,
  };
};

export default useRest;
