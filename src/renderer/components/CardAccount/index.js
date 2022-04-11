import React, { useState, useEffect } from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router';
import { Paper, Tooltip } from '@mui/material';
import Chip from '@mui/material/Chip';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import IconButton from '@mui/material/IconButton';
import AccountModal from '../../components/Modal/AccountModal';
const actions = [
  { icon: <EditIcon />, name: 'Editer' },
  { icon: <HistoryIcon />, name: 'Historique' },
  { icon: <DeleteIcon />, name: 'Supprimer' },
];

function SpeedDialComponent(props) {
  const handleOpen = () => {
    props.setModal(true);
  };
  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      {props.isHover && (
        <IconButton
          onClick={handleOpen}
          aria-label="delete"
          size="small"
          sx={{
            position: 'absolute',
            bottom: 44,
            right: -14,
          }}
        >
          <DisplaySettingsOutlinedIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default function Card(props) {
  const navigate = useNavigate();
  const [isHover, setisHover] = useState(false);
  const [isHoverButton, setisHoverButton] = useState(false);
  const { account } = props;
  const [open, setOpen] = useState(false);
  const handleOverIn = () => {
    setisHover(true);
  };

  const handleOverOut = () => {
    setTimeout(() => {
      setisHover(false);
    }, 4000);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        fontWeight: 'bold',
        borderRadius: '10px',
        width: '22em',
        p: 2,
        margin: '10px',
        position: 'relative',
      }}
      onMouseOver={handleOverIn}
      onMouseOut={handleOverOut}
    >
      <div>
        <h4
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => {
            navigate(``, {
              state: {},
            });
          }}
        >
          {account.type}
        </h4>
      </div>
      <hr
        style={{
          color:
            account.solde == 0 ? 'grey' : account.solde > 0 ? 'green' : 'red',
          height: 1,
          backgroundColor:
            account.solde == 0 ? 'grey' : account.solde > 0 ? 'green' : 'red',
        }}
      />
      <div
        className="card-body"
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          textAlign: 'center',
          padding: 4,
        }}
      >
        {
          <SpeedDialComponent
            setisHoverButton={setisHoverButton}
            isHover={isHover}
            modal={open}
            setModal={setOpen}
          />
        }
        <p>
          <Chip
            label={account.solde}
            style={{
              backgroundColor:
                account.solde == 0
                  ? 'grey'
                  : account.solde > 0
                  ? 'green'
                  : 'red',
              color: 'white',
              fontSize: '1.5em',
            }}
          />
          <span style={{ fontSize: '1.2em', paddingTop: 50, marginLeft: 20 }}>
            kmf
          </span>
        </p>
        <AccountModal modal={open} setModal={setOpen} {...props} />
      </div>
    </Paper>
  );
}
