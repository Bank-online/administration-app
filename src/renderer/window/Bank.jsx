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
import SignatureCanvas from 'react-signature-canvas';
import BankOffice from 'renderer/components/Modal/BankOffice';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import BankHelper from '../helpers/BankHelper';
import BankCard from 'renderer/components/BankCard';
import AddBank from '@mui/icons-material/AddBusinessOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { fontSize } from '@mui/system';
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    classes={{ popper: className }}
    placement="top"
    style={{ margin: 0, fontSize: '1.7em' }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
export default function Bank(props) {
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [banks, setBanks] = useRecoilState(BankHelper.banksAtom);
  const content = () => {
    banks.map((el) => {
      console.log(el);
    });
  };
  useEffect(() => {
    BankHelper.service
      .getAll()
      .then(({ data }) => {
        setBanks(data.data);
      })
      .catch((err) => console.error(err));
  }, []);
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
          <BootstrapTooltip title="cree une nouvelle bank">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddBank style={{ fontSize: '1.4em' }} />
            </IconButton>
          </BootstrapTooltip>
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
      <Grid
        spacing={3}
        container
        style={{
          marginTop: '1.6em',
          overflow: 'auto',
          maxHeight: '65vh',
        }}
      >
        <SignatureCanvas
          penColor="green"
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        />

        {banks.map((bank, index) => {
          return (
            <Grid>
              <BankCard
                bankName={bank.officeName}
                ville={bank.city}
                email={props.email}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
