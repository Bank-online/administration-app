import React from 'react';
import BankRouter from './BankRouter';
import CloseBar from './components/CloseBar';
import Layout from './components/Layout';
import { useRecoilState } from 'recoil';
import userHelper from './helpers/UserHelper';
import jwtDecode from 'jwt-decode';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';
export default function App() {
  const [user, setUser] = useRecoilState(userHelper.userAtom);
  const [isLogin] = useRecoilState(userHelper.isLoginAtom);
  if (localStorage.getItem('token') && !user) {
    userHelper.service
      .getInfoUser(
        jwtDecode(localStorage.getItem('token')).uuid,
        localStorage.getItem('token')
      )
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.clear();
      });
  }

  return (
    <>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        TransitionComponent={Slide}
      >
        <Layout>
          <BankRouter />
        </Layout>
      </SnackbarProvider>
    </>
  );
}
