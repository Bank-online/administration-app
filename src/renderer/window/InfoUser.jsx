import React, { useState, useEffect } from 'react';
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
import AccountControlleur from 'renderer/components/Modal/UserModal/AcountControlleur';
import UserHelper from '../helpers/UserHelper';
import { token } from 'renderer/helpers/apiHelper';
import Skeleton from '@mui/material/Skeleton';
import FormUser from 'renderer/components/Modal/UserModal';
import AccountHelper from '../helpers/AccountHelper';
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
  const [openControlleur, setOpenControlleur] = useState(false);
  const { uuid } = useParams();
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [account, setAccount] = useState([]);

  const navigate = useNavigate();
  React.useEffect(() => {
    UserHelper.service
      .getInfoUser(uuid)
      .then(({ data }) => {
        setUser(data);
        return AccountHelper.service.AllAccountUser(uuid);
      })
      .then(({ data }) => {
        console.log(data);
        setAccount(data);

        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [uuid]);

  const handleOpenControlleur = () => {
    setOpenControlleur(true);
  };

  const handleCloseControlleur = () => {
    setOpenControlleur(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          {isLoading ? (
            <Skeleton variant="text" width={100} />
          ) : (
            <h1>{user.name + ' ' + user.forename}</h1>
          )}
        </div>
        <div>
          <BootstrapTooltip title="controlleur compte ">
            <IconButton
              color="primary"
              size={'6em'}
              onClick={handleOpenControlleur}
            >
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
              <IconButton
                color="primary"
                size={'6em'}
                onClick={() => {
                  setModalUpdate(true);
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </BootstrapTooltip>
            {!isLoading && (
              <FormUser
                user={user}
                setUser={setUser}
                setOpen={setModalUpdate}
                open={modalUpdate}
              />
            )}
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
              {isLoading ? (
                <Skeleton variant="rectangular" width={210} height={118} />
              ) : (
                <>
                  <p
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    nom : {user.name}
                  </p>
                  <p
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    prenom : {user.forename}
                  </p>
                  <p
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    date naissance : {user.birthday}
                  </p>
                </>
              )}
            </div>

            <div>{/*content*/}</div>
          </div>
          <div>
            <div>
              <h3>Information de facturation / domiciliation</h3>
            </div>
            {isLoading ? (
              <Skeleton variant="rectangular" width={210} height={118} />
            ) : (
              <div>
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <HomeIcon sx={{ pr: 1 }} /> {user.address}
                </p>

                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LocationCityIcon sx={{ pr: 1 }} /> {user.city} {user.zipCode}
                </p>

                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <FlagIcon sx={{ pr: 1 }} /> {user.country}
                </p>
              </div>
            )}
          </div>

          <div>
            <div>
              <h3>Information de contact</h3>
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <EmailIcon sx={{ pr: 1 }} /> {user.email}
                </p>
              )}
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
        <Grid container style={{ display: 'flex' }}>
          {account.map((value, index) => {
            return (
              <Grid>
                <CardAccount
                  account={value}
                  key={index}
                  style={{ width: '23em' }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
      {!isLoading && (
        <AccountControlleur
          openControlleur={openControlleur}
          setOpenControlleur={setOpenControlleur}
          infoUser={user}
        />
      )}
      ;
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
