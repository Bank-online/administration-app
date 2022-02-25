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

// Create an instance of Notyf

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        xs={7}
        md={4}
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
          style={{ marginBottom: '5%', color: 'red', marginTop: '20px' }}
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
          onClick={() => sendRequest()}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : 'Se connecter'}
        </Button>
      </Grid>
    </Grid>
  );
}
