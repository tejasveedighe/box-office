import { useReducer, useEffect, useState } from 'react';
import getAPI from './config';

// the reducer function useReducer
const showReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }
    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
};

function usePersistedReducer(reducer, initalState, key) {
  const [state, dispatch] = useReducer(reducer, initalState, initial => {
    /* this is the lazy initializer that is used to set the state, it overrides the initalState argument
     this function has more priority than the argument

     this runs before the initialState we can read from the local storage then set that data as state

     in this case we used this lazy initializer so that when we refresh the page the data stays
     the localStorage will be set to null after the refresh but when we set the data to a variable it can be set to it again */
    const persisited = localStorage.getItem(key);
    return persisited ? JSON.parse(persisited) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state)); // write the state to local storage
  }, [state, key]); // when the state or key changes

  return [state, dispatch];
}

// using this function so that we dont have to call the usePersistedReducer and pass a reducer to it
export function useShows(key = 'shows') {
  return usePersistedReducer(showReducer, [], key);
}

// custom hook for saving the input from refreshing
export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisited = sessionStorage.getItem(key);
    return persisited ? JSON.parse(persisited) : '';
  });

  const usePersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };

  return [input, usePersistedInput];
}

// custom hook for getting the show page

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { show: action.show, isLoading: false, error: null };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, error: action.error, isLoading: false };
    }
    default:
      return prevState;
  }
};

export function useShow(showId) {
  let isMounted = true;

  const [shows, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    getAPI(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [showId]);

  return [shows];
}
