import React, { useState } from 'react';
import { withStyles, MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { teal, grey } from '@material-ui/core/colors';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import bankHelper from '../../../helpers/BankHelper';
import { useRecoilState } from 'recoil';
const steps = [
  'info client ',
  'Recapitulatif',
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    overFlow: 'hiden',
    heigth: '86vh',
  },
  primaryColor: {
    color: teal[500],
  },
  secondaryColor: {
    color: grey[700],
  },

  padding: {
    padding: 3,
  },
  mainHeader: {
    backgroundColor: grey[100],
    padding: 0,
    alignItems: 'center',
  },
  mainContent: {
    padding: 20,
    heigthmin: '110em',
  },
  secondaryContainer: {
    padding: '20px 25px',
    backgroundColor: grey[200],
  },
});

function UserModal(props) {
  const { classes, open, setOpen } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirme, setConfirme] = React.useState(false);
  const [isloading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setConfirme(true);
  };
  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    ville: '',
    pays: '',
    adress: '',
    nbemploy: '',
    emailPro: '',
    lastName: '',
    name: '',
  });

  const ValidForm = (parti2 = null) => {
    if (!parti2) {
      if (handleRequired(name, 'name', 'nom du client')) {
        return false;
      } else if (
        handleRequired(email, 'email', 'Email') ||
        !emailIsValid(email)
      ) {
        return false;
      } else if (handleRequired(country, 'pays', 'pays')) {
        return false;
      } else if (handleRequired(address, 'adress', 'adresse')) {
        return false;
      } else if (handleRequired(lastName, 'lastname', 'prenom du client')) {
        return false;
      } else {
        return true;
      }
    }
  };

  /**
   * Fonction pour s'assurer que l'affichage du champ d'erreur soit pris en compte
   * @param {String} value Valeur à l'intérieur
   * @param {String} field Nom du champ dans le message d'erreur
   * @param {String} requiredField La valeur du champ qu'on veut avoir
   */
  function handleRequired(value, field, requiredField) {
    if (value === '') {
      setErrorMessages((current) => {
        return {
          ...current,
          [field]: requiredField + ' est un champs obligatoire',
        };
      });
      return true;
    } else {
      setErrorMessages((current) => {
        return {
          ...current,
          [field]: '',
        };
      });
      return false;
    }
  }

  const handleClose = () => {
    setConfirme(false);
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0 && !ValidForm()) {
      handleRequired(name, 'name', 'nom du client');
      handleRequired(country, 'pays', 'pays');
      handleRequired(address, 'adress', 'adresse');
      handleRequired(lastName, 'lastName', 'prenom du client');
      handleRequired(city, 'ville', 'ville');
      if (!emailIsValid(email)) {
        setErrorMessages((current) => {
          return {
            ...current,
            email: 'Email invalid.',
          };
        });
      }
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleReset = () => {
    setActiveStep(0);
  };

  const sendData = () => {
    let data = {
      name: name,
      forename: lastName,
      email: email,
      country: country,
      address: address,
      city: city,
      email: email,
    };
    bankHelper.service
      .create(data)
      .then(({ data }) => {
        enqueueSnackbar(
          'création du compte utilisateur a bien etait prise en compte',
          {
            variant: 'success',
          }
        );
        //remplacer par l'ajout d'un utilisateur
        // setBanks((current) => [...current, data.bank]);
        setTimeout(() => {
          setOpen(false);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('la creation du compte utilisateur a échouer ', {
          variant: 'error',
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };
  return (
    <Dialog
      className={classes.root}
      maxWidth="md"
      maxHeight="md"
      minWidth="md"
      open={open}
      onClose={() => {
        handleReset();
        setOpen(false);
      }}
    >
      <DialogContent className={classes.padding}>
        <Grid
          container
          justifyContent="center"
          style={{ height: '40em', minWidth: '45em' }}
        >
          <Grid item xs={10}>
            <Grid container direction="row" className={classes.mainHeader}>
              <Grid item xs={8}>
                <Typography className={classes.primaryColor} variant="h5">
                  Formulaire compte utilisateur
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.mainContent}
              style={{ width: 'md' }}
            >
              {activeStep === 1 && (
                <>
                  <Grid xs={12}>
                    <h3>information lier client : </h3>
                    <Grid style={{ paddingTop: '1em' }}>
                      <TextField
                        style={{ width: '243px', margin: '2px' }}
                        type="text"
                        label="nom du client"
                        required
                        variant="outlined"
                        value={name}
                        helperText={
                          errorMessages.name !== '' && errorMessages.name
                        }
                        error={errorMessages.name !== ''}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={(e) => {
                          handleRequired(e.currentTarget.value, 'name', 'name');
                        }}
                      />
                      <TextField
                        style={{ width: '243px', margin: '2px' }}
                        type="email"
                        required
                        label="email"
                        variant="outlined"
                        error={errorMessages.email !== ''}
                        helperText={
                          errorMessages.email !== '' && errorMessages.email
                        }
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={async (e) => {
                          handleRequired(
                            e.currentTarget.value,
                            'email',
                            'Email'
                          );
                          if (!emailIsValid(e.currentTarget.value)) {
                            setErrorMessages((current) => {
                              return {
                                ...current,
                                email: 'format email incorrect',
                              };
                            });
                          }
                        }}
                      />
                      <TextField
                        style={{ width: '243px', margin: '2px' }}
                        type="text"
                        label="prenom"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={errorMessages.lastName !== ''}
                        helperText={
                          errorMessages.lastName !== '' &&
                          errorMessages.lastName
                        }
                        required
                        onBlur={(e) => {
                          handleRequired(
                            e.currentTarget.value,
                            'lastName',
                            'prenom'
                          );
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid style={{ paddingTop: '1.5em' }}>
                    <TextField
                      style={{ width: '243px', margin: '2px' }}
                      type="text"
                      label="ville"
                      variant="outlined"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      error={errorMessages.ville !== ''}
                      helperText={
                        errorMessages.ville !== '' && errorMessages.ville
                      }
                      required
                      onBlur={(e) => {
                        handleRequired(e.currentTarget.value, 'ville', 'ville');
                      }}
                    />
                    <TextField
                      style={{ width: '243px', margin: '2px' }}
                      type="text"
                      label="pays"
                      variant="outlined"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      error={errorMessages.pays !== ''}
                      helperText={
                        errorMessages.pays !== '' && errorMessages.pays
                      }
                      required
                      fullWidth
                      onBlur={(e) => {
                        handleRequired(e.currentTarget.value, 'pays', 'pays');
                      }}
                    />
                    <TextField
                      style={{ width: '243px', margin: '2px' }}
                      type="text"
                      label="adresse"
                      variant="outlined"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      error={errorMessages.adress !== ''}
                      helperText={
                        errorMessages.adress !== '' && errorMessages.adress
                      }
                      required
                      onBlur={(e) => {
                        handleRequired(
                          e.currentTarget.value,
                          'adress',
                          'adresse'
                        );
                      }}
                    />
                  </Grid>
                </>
              )}


              {activeStep === 0 && (
                <Grid container xs={12} direction="row" justifyContent="center">
                  <Grid xs={5}>
                    <h3>information Bank : </h3>
                    <div style={{ fontSize: '1.2em' }}>
                      <p>nom : {name}</p>
                      <p>prenom :{lastName} </p>
                      <p>pays :{country} </p>
                      <p>ville : {city}</p>
                      <p>addresse : {address}</p>
                      <p>email : {email}</p>
                    </div>
                  </Grid>
                  <Grid xs={6}>
                  </Grid>
                </Grid>
                
              )}

              <Grid xs={12}>
                <Typography sx={{ mt: 2, mb: 1 }}></Typography>
                <Box
                  xs={10}
                  sx={{ display: 'flex', flexDirection: 'row', pt: 10 }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (activeStep === steps.length - 1) {
                        return handleClickOpen();
                      }
                      handleNext();
                    }}
                    style={{ marginLeft: '20em' }}
                  >
                    {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} className={classes.secondaryContainer} style={{paddingRight :"7em"}}>
            <Grid container>
              <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep != 0 ? (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Précédent
                  </Button>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <div>
          <Dialog
            open={confirme}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {
                'vous etes sur le  point de cree un compte client etes vous sur de continuer ?'
              }
            </DialogTitle>

            <DialogActions>
              <Button
                onClick={() => {
                  setActiveStep(0);
                  setConfirme(false);
                  setTimeout(() => {
                    setOpen(false);
                  }, 1000);
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  setActiveStep(0);
                  setConfirme(false);
                  setLoading(true);
                  sendData();
                }}
              >
                Continuer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isloading}
          >
            <p
              style={{
                color: 'white',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                fontSize: '1.5em',
              }}
            >
              un instant...
            </p>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(UserModal);
