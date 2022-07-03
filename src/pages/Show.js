import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import getAPI from '../misc/config';

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

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

function Show() {
  const { id } = useParams();

  let isMounted = true;

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //   const [show, setShow] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);
  useEffect(() => {
    getAPI(`/shows/${id}?embed[]=seasons&embed[]=cast`)
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
  }, [id]);

  if (isLoading) {
    return <div>The Data is being Loaded</div>;
  }
  if (error) {
    return <div>Error Message {error}</div>;
  }
  console.log(show);
  return <div>Show Page</div>;
}

export default Show;
