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
const steps = ['information bank', 'information directeur', 'Recapitulatif'];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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

function BankModal(props) {
  const { classes, open, setOpen } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [nameBank, setNameBank] = useState('');
  const [countryBank, setCountryBank] = useState('');
  const [addressBank, setAddressBank] = useState('');
  const [cityBank, setCityBank] = useState('');
  const [numberEmploy, setNumberEmploy] = useState('');
  const [emailBank, setEmailBank] = useState('');
  const [directeurName, setDirecteurName] = useState('');
  const [directeurEmail, setDirecteurEmail] = useState('');
  const [directeurLastName, setDirecteurLastName] = useState('');
  const [confirme, setConfirme] = React.useState(false);
  const [isloading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setConfirme(true);
  };
  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [errorBankMessages, setErrorMessages] = useState({
    bankname: '',
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
      if (handleRequired(nameBank, 'bankname', 'nom de la bank')) {
        return false;
      } else if (
        handleRequired(emailBank, 'email', 'Email') ||
        !emailIsValid(emailBank)
      ) {
        return false;
      } else if (handleRequired(countryBank, 'pays', 'pays')) {
        return false;
      } else if (handleRequired(addressBank, 'adress', 'adresse')) {
        return false;
      } else if (handleRequired(numberEmploy, 'nbemploy', 'nombre employer')) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        handleRequired(directeurEmail, 'emailPro', "l'email pro") ||
        !emailIsValid(directeurEmail)
      ) {
        return false;
      } else if (
        handleRequired(directeurLastName, 'lastname', 'prenom du directeur')
      ) {
        return false;
      } else if (handleRequired(directeurName, 'name', 'nom du directeur')) {
        return false;
      }
      return true;
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
      handleRequired(nameBank, 'bankname', 'nom de la bank');
      handleRequired(countryBank, 'pays', 'pays');
      handleRequired(addressBank, 'adress', 'adresse');
      handleRequired(numberEmploy, 'nbemploy', 'nombre employer');
      handleRequired(cityBank, 'ville', 'viller');
      if (!emailIsValid(emailBank)) {
        setErrorMessages((current) => {
          return {
            ...current,
            email: 'Email invalid.',
          };
        });
      }
    } else if (activeStep === 1 && !ValidForm('part2')) {
      handleRequired(directeurLastName, 'lastName', 'prenom du directeur');
      handleRequired(directeurName, 'name', 'nom du directeur');
      if (!emailIsValid(emailBank)) {
        setErrorMessages((current) => {
          return {
            ...current,
            emailPro: 'Email invalid.',
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

  const sendData =()=>{


    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 1000);
    enqueueSnackbar('creation ok ', { variant: 'warning' });
  }
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
                  Formulaire de creation de bank
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.mainContent}
              style={{ width: 'md' }}
            >
              {activeStep === 0 && (
                <>
                  <Grid xs={12}>
                    <h3>information bank : </h3>
                    <Grid style={{ paddingTop: '1em' }}>
                      <TextField
                        style={{ width: '243px', margin: '2px' }}
                        type="text"
                        label="Bank name"
                        required
                        variant="outlined"
                        value={nameBank}
                        helperText={
                          errorBankMessages.bankname !== '' &&
                          errorBankMessages.bankname
                        }
                        error={errorBankMessages.bankname !== ''}
                        onChange={(e) => setNameBank(e.target.value)}
                        onBlur={(e) => {
                          handleRequired(
                            e.currentTarget.value,
                            'bankname',
                            'bank name'
                          );
                        }}
                      />
                      <TextField
                        style={{ width: '243px', margin: '2px' }}
                        type="email"
                        required
                        label="email"
                        variant="outlined"
                        error={errorBankMessages.email !== ''}
                        helperText={
                          errorBankMessages.email !== '' &&
                          errorBankMessages.email
                        }
                        value={emailBank}
                        onChange={(e) => setEmailBank(e.target.value)}
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
                        type="number"
                        label="nombre employer"
                        variant="outlined"
                        value={numberEmploy}
                        required
                        error={errorBankMessages.nbemploy !== ''}
                        helperText={
                          errorBankMessages.nbemploy !== '' &&
                          errorBankMessages.nbemploy
                        }
                        onChange={(e) => setNumberEmploy(e.target.value)}
                        onBlur={(e) => {
                          handleRequired(
                            e.currentTarget.value,
                            'nbemploy',
                            "nombre d'employer"
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
                      value={cityBank}
                      onChange={(e) => setCityBank(e.target.value)}
                      error={errorBankMessages.ville !== ''}
                      helperText={
                        errorBankMessages.ville !== '' &&
                        errorBankMessages.ville
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
                      value={countryBank}
                      onChange={(e) => setCountryBank(e.target.value)}
                      error={errorBankMessages.pays !== ''}
                      helperText={
                        errorBankMessages.pays !== '' && errorBankMessages.pays
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
                      value={addressBank}
                      onChange={(e) => setAddressBank(e.target.value)}
                      error={errorBankMessages.adress !== ''}
                      helperText={
                        errorBankMessages.adress !== '' &&
                        errorBankMessages.adress
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

              {activeStep === 1 && (
                <>
                  <Grid xs={12}>
                    <h3>information directeur : </h3>
                    <Grid style={{ paddingTop: '2em' }}>
                      <TextField
                        style={{ width: '243px', margin: '2px' }}
                        type="text"
                        label="nom"
                        variant="outlined"
                        value={directeurName}
                        onChange={(e) => setDirecteurName(e.target.value)}
                        error={errorBankMessages.name !== ''}
                        helperText={
                          errorBankMessages.name !== '' &&
                          errorBankMessages.name
                        }
                        required
                        onBlur={(e) => {
                          handleRequired(e.currentTarget.value, 'name', 'nom');
                        }}
                      />
                      <TextField
                        style={{ width: '243px', margin: '2px' }}
                        type="text"
                        label="prenom"
                        variant="outlined"
                        value={directeurLastName}
                        onChange={(e) => setDirecteurLastName(e.target.value)}
                        error={errorBankMessages.lastName !== ''}
                        helperText={
                          errorBankMessages.lastName !== '' &&
                          errorBankMessages.lastName
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
                      <TextField
                        style={{ width: '243px', margin: '2px' }}
                        type="email"
                        label="email"
                        variant="outlined"
                        value={directeurEmail}
                        onChange={(e) => setDirecteurEmail(e.target.value)}
                        error={errorBankMessages.emailPro !== ''}
                        helperText={
                          errorBankMessages.emailPro !== '' &&
                          errorBankMessages.emailPro
                        }
                        required
                        onBlur={(e) => {
                          handleRequired(
                            e.currentTarget.value,
                            'emailPro',
                            'email'
                          );
                        }}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {activeStep === 2 && (
                <Grid container xs={12} direction="row" justifyContent="center">
                  <Grid xs={5}>
                    <h3>information Bank : </h3>
                    <div style={{ fontSize: '1.2em' }}>
                      <p>nom de la bank : {nameBank}</p>
                      <p>pays :{countryBank} </p>
                      <p>ville : {cityBank}</p>
                      <p>addresse : {addressBank}</p>
                      <p>email : {emailBank}</p>
                    </div>
                  </Grid>
                  <Grid xs={5}>
                    <h3>information directeur : </h3>
                    <div style={{ fontSize: '1.2em' }}>
                      <p>nom : {directeurName}</p>
                      <p>prenom :{directeurLastName} </p>
                      <p>email : {directeurEmail}</p>
                    </div>
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
          <Grid item xs={2} className={classes.secondaryContainer}>
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
                'vous etes sur le  point de cree une bank etes vous sur de continuer?'
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

export default withStyles(styles)(BankModal);
