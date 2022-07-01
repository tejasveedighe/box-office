import React from 'react';
import ShowCard from './ShowCard';

import NO_IMAGE from '../../not-found.png';
import { FlexGrid } from '../styled';

function ShowGrid({ data }) {
  return (
    <FlexGrid>
      {data.map(({ show }) => {
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            image={show.image ? show.image.medium : NO_IMAGE}
            name={show.name}
            summary={show.summary}
          />
        );
      })}
    </FlexGrid>
  );
}

export default ShowGrid;
