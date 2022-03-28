import React from 'react';
import { useParams } from 'react-router';
import { Avatar, Box, Button, Grid, Paper, TextField } from '@mui/material';
import AccountIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CardAccount from '../components/CardAccount';
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
export default function InfoUser(props) {
  const { uuid } = useParams();
  const [enterprise, setEnterprise] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEnterprise = () => {
    if (confirm('Are you sure you want to delete this enterprise?')) {
    }
  };

  React.useEffect(() => {
    handleOpen();
  }, []);

  return (
    <Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1>mohamadi msa abdou</h1>
        </div>
        <div>
          <BootstrapTooltip title="controlleur compte ">
            <IconButton color="primary" size={'6em'}>
              <AppSettingsAltIcon />
            </IconButton>
          </BootstrapTooltip>
        </div>
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Avatar
          sx={{
            width: '150px',
            height: '150px',
          }}
        />
      </div>

      <Paper
        elevation={2}
        sx={{
          p: 5,
          mb: 5,
          width: '100%',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>Informations sur le client </h2>
          <div>
            <BootstrapTooltip title="modifier les info utilisateur">
              <IconButton color="primary" size={'6em'}>
                <EditOutlinedIcon />
              </IconButton>
            </BootstrapTooltip>
          </div>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
            <div>
            <div>
              <h3>Information génerale</h3>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                nom : msa abdou
              </p>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                prenom : mohamadi
              </p>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                date naissance : 12/07/1998
              </p>
            </div>
            <div>{/*content*/}</div>
          </div>
          <div>
            <div>
              <h3>Information de facturation / domiciliation</h3>
            </div>
            <div>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <HomeIcon sx={{ pr: 1 }} /> {'2& rue de engelbreit'}
              </p>

              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LocationCityIcon sx={{ pr: 1 }} /> {'strasbourg'} {67000}
              </p>

              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FlagIcon sx={{ pr: 1 }} /> {'france'}
              </p>
            </div>
          </div>
          <div>
            <div>
              <h3>Information de contact</h3>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EmailIcon sx={{ pr: 1 }} /> {'petubrt@gmail.com'}
              </p>
            </div>
            <div>{/*content*/}</div>
          </div>
        
        </div>
      </Paper>
      <Paper
        elevation={2}
        sx={{
          p: 5,
          mb: 5,
          width: '100%',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2>Aperçu compte client </h2>
          </div>
          <div>
            <BootstrapTooltip title="ajouter un compte">
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                size={'6em'}
              >
                <AccountIcon />
              </IconButton>
            </BootstrapTooltip>
          </div>
        </div>
        <hr />
        <CardAccount style={{ width: '23em' }} />
      </Paper>

      {/* <Paper
        elevation={2}
        sx={{
          p: 5,
          mb: 5,
          width: '100%',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2>Informations sur les options</h2>
          </div>
          <div></div>
        </div>
        <hr />
      </Paper> */}
    </Box>
  );
}
