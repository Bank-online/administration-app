import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Paper, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import UserCard from 'renderer/components/UserCard';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import BankOffice from 'renderer/components/Modal/BankOffice';

export default function Bank(props) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1>Liste des Bank</h1>
        </div>
        <div>
          <Button variant={'outlined'} onClick={() => {setOpen(true)}}>
            Créé une nouvelle Bank
          </Button>
        </div>
      </div>
      <Box>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ position: 'relative', width: '50%' }}>
            <TextField
              fullWidth
              autoComplete={'off'}
              id={'outlined-search'}
              type="text"
              label="Rechercher une bank"
              placeholder="Rechercher une bank"
              variant="outlined"
            />
          </div>
        </div>
      </Box>
      <BankOffice open={open} setOpen={setOpen} />
      <Grid spacing={3} container>
        <UserCard />
        <UserCard />
        <UserCard />
      </Grid>
    </Box>
  );
}
