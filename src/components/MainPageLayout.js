import React from 'react';
import Navs from './Navs';

export default function MainPageLayout({ children }) {
  return (
    <div>
      <Navs />
      {children}
    </div>
  );
}
