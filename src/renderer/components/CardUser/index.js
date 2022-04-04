import React,{useEffect} from 'react';
import { Button, Grid, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from 'react-router-dom';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import UserHelper from '../../helpers/UserHelper'
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
export default function CardUser({ user }) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        m: 2,
        width: '22em',
        borderRadius: '10px',
      }}
    >
      <BootstrapTooltip title="acceder au profile ">
        <h3
          style={{
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate(`/user/${user.uuid}`, {
              state: {},
            });
          }}
        >
          {user.name + ' ' + user.forename}
        </h3>
      </BootstrapTooltip>

      <hr />

      <div>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EmailIcon sx={{ pr: 1 }} /> {user.email}
          &nbsp;&nbsp;
        </p>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <PermPhoneMsgOutlinedIcon sx={{ pr: 1 }} /> {user.phoneNumber}{' '}
          &nbsp;&nbsp;
        </p>

        <p
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LocationCityIcon sx={{ pr: 1 }} /> {user.city} &nbsp;&nbsp; |
          &nbsp;&nbsp;
          <FlagOutlinedIcon sx={{ pr: 1 }} /> {user.country}
        </p>
      </div>

      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '5px',
        }}
      >
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: 0,
          }}
        >
          <BadgeOutlinedIcon sx={{ pr: 1 }} /> {user.id_user} &nbsp;&nbsp;
        </h3>
      </div>
    </Paper>
  );
}
