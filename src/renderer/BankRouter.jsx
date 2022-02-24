import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './window/Login';
import Home from './window/Home';

const BankRouter = () => {
  const user = true;
  return (
    <div>
      <Routes>
      {user ? (
        <Route path={'/'} element={<Home />} />
      ) : (
        <Route path={'/'} element={<Login />} />
      )}
    </Routes>
    </div>
  );
};

export default BankRouter;
