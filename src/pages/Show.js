import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import getAPI from '../misc/config';

function Show() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  useEffect(() => {
    getAPI(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results =>
      setShow(results)
    );
  }, [id]);

  console.log(show);
  return <div>Show Page</div>;
}

export default Show;
