import React from 'react';
import { Button, Grid, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from 'react-router-dom';

export default function BankCard(props) {
  const navigate = useNavigate();
  return (
    <Grid item xs={3}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          m: 1,
          width: '25em',
          borderRadius: '10px',
        }}
      >
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          {props.bankName}
        </h3>

        <hr />

        <div>
          {/* <p style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}><EmailIcon sx={{pr: 1}} /> {props.email}</p> */}

          <p
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocationCityIcon sx={{ pr: 1 }} /> {props.ville}
          </p>
        </div>

        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Button variant={'outlined'} size={'small'} onClick={() => {}}>
            Plus d'informations
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}
