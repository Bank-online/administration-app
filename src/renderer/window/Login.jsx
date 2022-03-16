import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import userHelper from '../helpers/UserHelper';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import jwtDecode from 'jwt-decode';

export default function Login(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [, setUser] = useRecoilState(userHelper.userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handelLogin = () => {
    setLoading(true);
    userHelper.service
      .authenticate(email, password)
      .then(({ data }) => {
        return data.token;
      })
      .then((token) => {
        localStorage.setItem('token', token);
        return userHelper.service.getInfoUser(jwtDecode(token).uuid, token);
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        localStorage.removeItem('token');
        console.error(err);
        setLoading(false);
        enqueueSnackbar("le mot de passe ou l'identifant et incorrect", {
          variant: 'error',
        });
      });
  };

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', overflowY: 'hiden', position: 'fixed' }}
    >
      <Grid
        container
        item
        xs={5}
        lg={4}
        md={5}
        xl={4}
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #FFECD6',
          borderRadius: '10px 100px / 120px',
          backgroundColor: 'white',
          boxShadow: '1px 1px 4px 3px blue',
          padding: '60px',
        }}
      >
        <TextField
          disabled={loading}
          variant="outlined"
          label="Login :"
          style={{ color: 'blue' }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          disabled={loading}
          label="Password :"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '5%', color: 'blue', marginTop: '20px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={(e) => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant={'outlined'}
          color={'inherit'}
          onClick={() => handelLogin()}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : 'Se connecter'}
        </Button>
      </Grid>
    </Grid>
  );
}
