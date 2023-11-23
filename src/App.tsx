import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import UserProvider from './providers/UserProvider';

import MainRoute from './routes/MainRoute';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <MainRoute></MainRoute>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
