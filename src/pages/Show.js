import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import getAPI from '../misc/config';

function Show() {
  const { id } = useParams();

  let isMounted = true;

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getAPI(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShow(results);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
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
