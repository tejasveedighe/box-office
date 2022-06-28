import React from 'react';
import Navs from './Navs';
import Title from './Title';

export default function MainPageLayout({ children }) {
  return (
    <div>
      <Title title="BOX OFFICE" subtitle="What are you Looking for?" />
      <Navs />
      {children}
    </div>
  );
}
