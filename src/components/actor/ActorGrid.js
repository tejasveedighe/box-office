import React from 'react';
import ActorCard from './ActorCard';

import NO_IMAGE from '../../not-found.png';

function ActorGrid({ data }) {
  return (
    <div>
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
    </div>
  );
}

export default ActorGrid;
