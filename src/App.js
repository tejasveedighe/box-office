import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* this will work like context for all the child components they will be able to access theme as props */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/starred" element={<Starred />} />
        <Route exact path="/show/:id" element={<Show />} />
        <Route>Code 404 Page Not Found</Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
