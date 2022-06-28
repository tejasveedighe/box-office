import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<div>HomePage</div>} />;
      <Route>Code 404 Page Not Found</Route>
    </Routes>
  );
}

export default App;
