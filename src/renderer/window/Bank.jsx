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
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Bank(props) {
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  return (
    <Box>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={openNotif}
          autoHideDuration={6000}
          onClose={() => setOpenNotif(false)}
        >
          <Alert
            onClose={() => setOpenNotif(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            creation bank prise en compte
          </Alert>
        </Snackbar>
      </Stack>
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
          <Button
            variant={'outlined'}
            onClick={() => {
              setOpen(true);
            }}
          >
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
      <BankOffice open={open} setOpen={setOpen} setOpenNotif={setOpenNotif} />
      <Grid
        spacing={3}
        justifyContent="center"
        container
        style={{
          marginTop: '1.6em',
          overflow: 'auto',
          maxHeight: '65vh',
          msOverflowStyle: 'hidden',
        }}
      ></Grid>
    </Box>
  );
}
