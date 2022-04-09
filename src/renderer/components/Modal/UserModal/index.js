import React, { useState } from 'react';
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
import UserHelper from '../../../helpers/UserHelper';
import { useSnackbar } from 'notistack';
import validation from '../../../validations/UserValidation';
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
  const [dataProvisoir, setDataProvoir] = React.useState(props.user);

  const handleClickOpen = () => {
    props.setOpen(true);
  };
  const handleClose = () => {
    props.setOpen(false);
  };

  /**
   * cette fonction nous permet de remettre les valeur initial en cas d'anulation de modification
   */
  const resetData = () => {
    setPrenom(props.user.forename);
    setNom(props.user.name);
    setAddresse(props.user.address);
    setVille(props.user.city);
    setPays(props.user.country);
    setEmail(props.user.email);
    setTel(props.user.name);
    setNaissance(props.user.birthday);
    setDataProvoir(props.user);
    setError({
      name: false,
      forename: false,
      address: false,
      city: false,
      country: false,
      email: false,
      birthday: false,
      phoneNumber: false,
    });
  };
  const handleCancel = () => {
    resetData();
    props.setOpen(false);
  };
  const [error, setError] = useState({
    name: false,
    forename: false,
    address: false,
    city: false,
    country: false,
    email: false,
    birthday: false,
    phoneNumber: false,
  });

  const handleCheckErorr = (name, value) => {
    setError({
      ...error,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    /**
     * nous permet de verifier si un element a etait changer ou pas afin d'eviter d'envoyer des requette inutile
     */
    let identique = false;
    setDataProvoir((current) => {
      if (
        JSON.stringify(props.user) ==
        JSON.stringify({
          ...current,
          name: nom,
          forename: prenom,
          address: addresse,
          city: ville,
          country: pays,
          email: email,
          birthday: naissance,
        })
      ) {
        identique = true;
      }
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

    if (!identique) {
      let data = {
        name: nom,
        forename: prenom,
        address: addresse,
        city: ville,
        country: pays,
        email: email,
        birthday: naissance,
        phoneNumber: tel,
        uuid: props.user.uuid,
      };
      if (await validation.validateUsers(data)) {
        setError(await validation.validateUsers(data));
        return;
      }
      let validForm = Object.values(error);
      /**find erreur  trouver un moyen plus opti*/
      let contentError = false;
      validForm.map((value, key) => {
        if (value) {
          return (contentError = true);
        }
      });
      if (contentError) {
        return;
      }
      UserHelper.service
        .updateUser(data)
        .then(() => {
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
          props.setOpen(false);
          enqueueSnackbar('les modification on bien etait prise en compte', {
            variant: 'success',
          });
        })
        .catch((e) => {
          enqueueSnackbar("une erreur c'est produite", {
            variant: 'error',
          });
        });
    } else {
      enqueueSnackbar('Aucune modifiaction na était détecter', {
        variant: 'warning',
      });
      handleClose();
      resetData();
    }
  };

  return (
    <BootstrapDialog
      maxWidth={'md'}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCancel}>
        mise à jour information client
      </BootstrapDialogTitle>
      <DialogContent dividers style={{ width: '800px' }}>
        <Grid container>
          <Grid item xs={6}>
            <ListItem>
              <TextField
                required
                error={error.forename ? true : false}
                label="prenom"
                helperText={error.forename}
                value={prenom}
                onChange={(e) => {
                  setPrenom(e.target.value);
                }}
                onBlur={async (e) => {
                  if (!(await validation.validateFielsString(prenom, true))) {
                    handleCheckErorr('forename', 'ce champs est requis');
                  } else {
                    handleCheckErorr('forename', false);
                  }
                }}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                required
                error={error.name ? true : false}
                label="nom"
                helperText={error.name}
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
                onBlur={async (e) => {
                  if (!(await validation.validateFielsString(nom, true))) {
                    handleCheckErorr('name', 'ce champs est requis');
                  } else {
                    handleCheckErorr('name', false);
                  }
                }}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                required
                error={error.email ? true : false}
                label="adresse email"
                helperText={error.email}
                value={email}
                onChange={async (e) => {
                  setEmail(e.target.value);
                  if (
                    (await validation.validateEmail(email, true)) &&
                    email != props.email
                  ) {
                    UserHelper.service
                      .checkExisteUser({ email: e.target.value })
                      .then(({ data }) => {
                        if (data.userExiste) {
                          if (e.target.value != props.user.email) {
                            handleCheckErorr(
                              'email',
                              'cette adrress email est deja utiliser'
                            );
                          } else {
                            handleCheckErorr('email', false);
                          }
                        }
                      })
                      .catch((e) => console.log(e));
                    return;
                  }
                }}
                onBlur={async (e) => {
                  if (!(await validation.validateEmail(email, true))) {
                    handleCheckErorr(
                      'email',
                      email == '' || !email ? 'champs requis' : 'email invalide'
                    );
                  } else {
                    UserHelper.service
                      .checkExisteUser({ email: e.target.value })
                      .then(({ data }) => {
                        if (data.userExiste) {
                          console.log(email, props.user.email);
                          if (email !== props.user.email) {
                            handleCheckErorr(
                              'email',
                              'cette adrress email est deja utiliser'
                            );
                          }
                        } else {
                          handleCheckErorr('email', false);
                        }
                      })
                      .catch((e) => console.log(e));
                    return;
                  }
                }}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label="numero de telephone"
                helperText={error.phoneNumber}
                type="tel"
                error={error.phoneNumber ? true : false}
                value={tel}
                onBlur={async (e) => {
                  if (!(await validation.validatePhone(tel, true))) {
                    handleCheckErorr(
                      'phoneNumber',
                      tel == '' || !tel
                        ? 'champs requis'
                        : 'numero de telephone invalide'
                    );
                  } else {
                    handleCheckErorr('phoneNumber', false);
                  }
                }}
                onChange={(e) => setTel(e.target.value)}
                fullWidth
              ></TextField>
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <TextField
                label="date de naissance"
                value={naissance}
                helperText={error.birthday}
                error={error.birthday ? true : false}
                onChange={(e) => setNaissance(e.target.value)}
                onBlur={async (e) => {
                  if (!(await validation.validateDate(naissance, true))) {
                    handleCheckErorr(
                      'birthday',
                      naissance == ''
                        ? 'ce champs est requis'
                        : 'format accepte JJ/MM/AAAA'
                    );
                  } else {
                    handleCheckErorr('birthday', false);
                  }
                }}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label="Addresse"
                helperText={error.address}
                error={error.address ? true : false}
                value={addresse}
                onChange={(e) => setAddresse(e.target.value)}
                onBlur={async (e) => {
                  if (!(await validation.validateFielsString(addresse, true))) {
                    handleCheckErorr('address', 'ce champs est requis');
                  } else {
                    handleCheckErorr('address', false);
                  }
                }}
                fullWidth
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label="ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                helperText={error.city}
                error={error.city ? true : false}
                onBlur={async (e) => {
                  if (!(await validation.validateFielsString(ville, true))) {
                    handleCheckErorr('city', 'ce champs est requis');
                  } else {
                    handleCheckErorr('city', false);
                  }
                }}
                fullWidth
              ></TextField>
              <TextField
                label="pays"
                helperText={error.country}
                error={error.country ? true : false}
                value={pays}
                onChange={(e) => setPays(e.target.value)}
                onBlur={async (e) => {
                  if (!(await validation.validateFielsString(pays, true))) {
                    handleCheckErorr('country', 'ce champs est requis');
                  } else {
                    handleCheckErorr('country', false);
                  }
                }}
                fullWidth
              ></TextField>
            </ListItem>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'grey' }} onClick={handleCancel}>
          Annuler
        </Button>
        <Button style={{ color: 'blue' }} onClick={handleSubmit}>
          Enregistrer
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
