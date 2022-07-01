import React from 'react';
import ActorCard from './ActorCard';

import NO_IMAGE from '../../not-found.png';
import { FlexGrid } from '../styled';

function ActorGrid({ data }) {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          image={person.image ? person.image.medium : NO_IMAGE}
          name={person.name}
          gender={person.gender}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
        />
      ))}
    </FlexGrid>
  );
}

export default ActorGrid;
