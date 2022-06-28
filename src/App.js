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
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>
        <Route>Code 404 Page Not Found</Route>
      </Routes>
    </div>
  );
}

export default App;
