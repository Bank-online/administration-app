import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './window/Login';
import Home from './window/Home';
import { useRecoilState } from 'recoil';
import userHelper from './helpers/UserHelper';
import Logout from './window/Logout';
import Bank from './window/Bank';
const BankRouter = () => {
  const [user] = useRecoilState(userHelper.userAtom);

  return (
    <div>
      <Routes>
        {user ? (
          <>
            <Route path={'/'} element={<Bank />} />
            <Route path={'/logout'} element={<Logout />} />
          </>
        ) : (
          <>
            <Route path={'/'} element={<Login />} />
            <Route path={'/logout'} element={<Logout />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default BankRouter;
