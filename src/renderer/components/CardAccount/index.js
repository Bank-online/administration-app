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
const actions = [
  { icon: <EditIcon />, name: 'Editer' },
  { icon: <HistoryIcon />, name: 'Historique' },
  { icon: <DeleteIcon />, name: 'Supprimer' },
];

function SpeedDialComponent(props) {
  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Tooltip user fast actions"
        sx={{
          position: 'absolute',
          bottom: 50,
          right: -30,
          paddingBottom: '1em',
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() => {
              if (action.name === 'Editer') {
                props.edit(props.uuid);
              } else if (action.name === 'Supprimer') {
                props.handleDelete(props.uuid);
              } else if (action.name === 'Historique') {
                props.getActivities(props.uuid);
              }
            }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
export default function Card(props) {
  const navigate = useNavigate();
  const [isHover, setisHover] = useState(false);

  const handleOverIn = () => {
    setTimeout(() => {
      setisHover(true);
    }, 800);
  };

  const handleOverOut = () => {
    setTimeout(() => {
      setisHover(false);
    }, 7500);
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
          compte principal
        </h4>
      </div>
      <hr style={{ color: '#ff1f2e', height: 1, backgroundColor: '#ff1f2e' }} />
      <div
        className="card-body"
        style={{ display: 'block', position: 'relative', width: '100%',textAlign :"center" ,padding :4}}
      >
       
          <p><Chip label="-14999"  style={{backgroundColor: 'red' , color :"white" ,fontSize : "2em"} }/><span style={{fontSize :"1.2em",paddingTop : 50 ,marginLeft :20}}>kmf</span></p>
       
      </div>
   
    </Paper>
  );
}
