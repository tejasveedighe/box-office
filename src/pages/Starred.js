import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import getAPI from '../misc/config';
import { useShows } from '../misc/custom-hooks';

export default function Starred() {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(id => getAPI(`/shows/${id}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still Loading</div>}
      {error && <div>Error occcured: {error.message}</div>}
      {!isLoading && !shows && <div>No shows were starred</div>}
      {!isLoading && shows && (
        <div>
          <ShowGrid data={shows} />
        </div>
      )}
    </MainPageLayout>
  );
}
