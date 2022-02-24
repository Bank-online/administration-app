import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './window/Login';
import Home from './window/Home';

const BankRouter = () => {
  const user = false;
  return (
    <Routes>
      {user ? (
        <Route path={'/'} element={<Home />} />
      ) : (
        <Route path={'/'} element={<Login />} />
      )}
    </Routes>
  );
};

export default BankRouter;
