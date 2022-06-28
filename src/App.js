import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <div>
      <Navs />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/starred" element={<Starred />} />
        <Route>Code 404 Page Not Found</Route>
      </Routes>
    </div>
  );
}

export default App;
