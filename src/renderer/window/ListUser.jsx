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
import FormUser from 'renderer/components/Modal/UserModal';
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

  useEffect(() => {
    UserHelper.service
      .getAll()
      .then(({data}) => {
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
            {' '}
            <IconButton color="primary" size={'6em'}>
              <PersonAddAltOutlinedIcon />
            </IconButton>
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
          </div>
        </div>
      </Paper>
      <Grid container style={{ display: 'flex' }}>
      {users.map((user, index) => {
          return (
            <Grid>
              <CardUser user={user}/>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
