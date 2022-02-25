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
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useNavigate } from 'react-router';
import { Paper, Tooltip } from '@mui/material';

export default function UserCard(props) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        fontWeight: 'bold',
        borderRadius: '10px',
        width: '26em',
        p: 1,
        margin: '10px',
        position: 'relative',
      }}
    >
      <div className="card-header">
        <Tooltip title={"Afficher les informations de l'utilisateur: " + 'nom'}>
          <h3
            className="card-title"
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => {}}
          >
           "prenom"
          </h3>
        </Tooltip>
      </div>
      <hr style={{ color: '#ff1f2e', height: 1, backgroundColor: '#ff1f2e' }} />
      <div
        className="card-body"
        style={{ display: 'block', position: 'relative', width: '100%' }}
      >
        <p
          style={{
            display: 'flex',
            justifyItems: 'center',
            padding: '5px',
            position: 'relative',
            width: '1em',
            overflow: 'visible',
            fontSize: '0.9em',
          }}
        >
          <AlternateEmailIcon style={{ marginRight: '5px' }} /> {props.email}
        </p>
        <p style={{ display: 'flex', justifyItems: 'center', padding: '5px' }}>
          <PhoneCallbackIcon style={{ marginRight: '5px' }} />{' '}
          {props.phoneNumber}
        </p>
        <p style={{ display: 'flex', justifyItems: 'center', padding: '5px' }}>
          <MergeTypeIcon style={{ marginRight: '5px' }} /> {props.role}
        </p>
      </div>
    </Paper>
  );
}
