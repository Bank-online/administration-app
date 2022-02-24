import React from 'react';
import BankRouter from './BankRouter';
import CloseBar from './components/CloseBar';
import Layout from './components/Layout';

export default function App() {
  return (
    <>
      <Layout>
        <BankRouter />
      </Layout>
    </>
  );
}
