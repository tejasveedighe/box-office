import React from 'react';
import ShowCard from './ShowCard';

import NO_IMAGE from '../../not-found.png';
import { FlexGrid } from '../styled';
import { useShows } from '../../misc/custom-hooks';

function ShowGrid({ data }) {
  const [starredShows, dispatchedStarred] = useShows();

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);
        const onClickStar = () => {
          if (isStarred) {
            dispatchedStarred({ type: 'REMOVE', showId: show.id });
          } else dispatchedStarred({ type: 'ADD', showId: show.id });
        };
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            image={show.image ? show.image.medium : NO_IMAGE}
            name={show.name}
            summary={show.summary}
            onClickStar={onClickStar}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
}

export default ShowGrid;
