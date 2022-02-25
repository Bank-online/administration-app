import React from 'react';
import BankRouter from './BankRouter';
import CloseBar from './components/CloseBar';
import Layout from './components/Layout';
import { useRecoilState } from 'recoil';
import userHelper from './helpers/UserHelper';

export default function App() {
  const [user] = useRecoilState(userHelper.userAtom);
  const [isLogin] =useRecoilState(userHelper.isLoginAtom)
  
  return (
    <>
      <Layout>
        <BankRouter />
      </Layout>
    </>
  );
}
