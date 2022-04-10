import React, { useState, useEffect } from 'react';
import {
  alertTitleClasses,
  Box,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import CardUser from '../components/CardUser';
import { IconButton } from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import UserHelper from '../helpers/UserHelper';
import FormUser from 'renderer/components/Modal/UserModal/newUser';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
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

export default function ListUser(props) {
  const [users, setUsers] = useRecoilState(UserHelper.Atom.users);
  const [uuid, setUuid] = useState(null);
  const [uuidActivities, setUuidActivities] = useState(null);
  const [search, setSearch] = useState([]);
  const [filterRole, setFilterRole] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const roleSelectors = ['user'];
  const responseSearchUser = [];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    UserHelper.service
      .getAll()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          m: 1,
          width: '100%',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            width: '100%',
          }}
        >
          <div>
            <h1></h1>
          </div>
          <div>
            <BootstrapTooltip title="cree un nouveau client ">
              <IconButton color="primary" size={'6em'} onClick={handleOpen}>
                <PersonAddAltOutlinedIcon />
              </IconButton>
            </BootstrapTooltip>
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', width: '50%' }}>
            <TextField
              fullWidth
              autoComplete={'off'}
              id={'outlined-search'}
              type="text"
              placeholder="Rechercher par identifiant , nom , prenom ,numero de compte"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormUser open={open} setOpen={setOpen}  setUsers={setUsers}/>
          </div>
        </div>
      </Paper>
      <Grid container style={{ display: 'flex' }}>
        {users.map((user, index) => {
          return (
            <Grid>
              <CardUser user={user} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
