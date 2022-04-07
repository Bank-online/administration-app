import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {
  TextField,
  ListItem,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Dialog,
  Slide,
  CircularProgress,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import UserHelper from '../../../helpers/UserHelper'
import { useSnackbar } from 'notistack';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [prenom, setPrenom] = React.useState(props.user.forename);
  const [nom, setNom] = React.useState(props.user.name);
  const [addresse, setAddresse] = React.useState(props.user.address);
  const [ville, setVille] = React.useState(props.user.city);
  const [pays, setPays] = React.useState(props.user.country);
  const [email, setEmail] = React.useState(props.user.email);
  const [tel, setTel] = React.useState(props.user.name);
  const [naissance, setNaissance] = React.useState(props.user.birthday);

  const handleClickOpen = () => {
    props.setOpen(true);
  };
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleSubmit = () => {
    enqueueSnackbar("les modifiaction on bien etait prise en compte", {
      variant: 'success',
    });
    props.setUser((current) => {
      return {
        ...current,
        name: nom,
        forename: prenom,
        address: addresse,
        city: ville,
        country: pays,
        email: email,
        birthday: naissance,
      };
    });
  };

  return (
    <BootstrapDialog
      maxWidth={'md'}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        mise à jour information client
      </BootstrapDialogTitle>
      <DialogContent dividers style={{ width: '800px' }}>
        <Grid container>
          <Grid item xs={6}>
            <ListItem>
              <TextField
                required
                error={null}
                label="prenom"
                helperText={null}
                value={prenom}
                onChange={(e) => {
                  setPrenom(e.target.value);
                }}
                onBlur={(e) => {}}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                required
                error={null}
                label="nom"
                helperText={null}
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
                onBlur={(e) => {}}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                required
                error={''}
                label="adresse email"
                helperText={''}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={async (e) => {}}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label="numero de telephone"
                helperText=""
                type="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                fullWidth
              ></TextField>
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <TextField
                label="date de naissance"
                helperText=""
                value={naissance}
                onChange={(e) => setNaissance(e.target.value)}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label="Addresse"
                helperText=""
                value={addresse}
                onChange={(e) => setAddresse(e.target.value)}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label="ville"
                helperText=""
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                fullWidth
              ></TextField>
              <TextField
                label="pays"
                helperText=""
                value={pays}
                onChange={(e) => setPays(e.target.value)}
                fullWidth
              ></TextField>
            </ListItem>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'grey' }} onClick={handleClose}>
          Annuler
        </Button>
        <Button style={{ color: 'blue' }} onClick={handleSubmit}>
          Enregistrer
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
