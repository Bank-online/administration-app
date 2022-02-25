import React from 'react';
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
const steps = ['information bank', 'information directeur', 'Recapitulatif'];

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    overFlow: 'hiden',
    heigth: '80vh',
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
    heigthmin : "100em"
  },
  secondaryContainer: {
    padding: '20px 25px',
    backgroundColor: grey[200],
  },
});

function BankModal(props) {
  const { classes, open, setOpen } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setOpen(false);
      setActiveStep(-1);
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Dialog
      className={classes.root}
      fullWidth
      maxWidth="md"
      style={{ heigth: '80vh' }}
      open={open}
      onClose={() => {
        handleReset();
        setOpen(false);
      }}
    >
      <DialogContent className={classes.padding}>
        <Grid container>
          <Grid item xs={10}>
            <Grid container direction="row" className={classes.mainHeader}>
              <Grid item xs={8}>
                <Typography className={classes.primaryColor} variant="h5">
                  Formulaire de creation de bank
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" className={classes.mainContent}>
              {activeStep === 0 && (
                <>
                  <Grid xs={12}>
                    <h3>information bank : {activeStep} </h3>
                    <Grid style={{ paddingTop: '2em' }}>
                      <TextField
                        style={{ width: '250px', margin: '3px' }}
                        type="text"
                        label="bank name"
                        variant="outlined"
                        onChange={}
                      />
                      <TextField
                        style={{ width: '25Opx', margin: '3px' }}
                        type="email"
                        label="email"
                        variant="outlined"
                        onChange={}
                      />
                      <TextField
                        style={{ width: '250px', margin: '3px' }}
                        type="number"
                        label="nombre employer"
                        variant="outlined"
                        onChange={}
                      />
                    </Grid>
                  </Grid>
                  <Grid style={{ paddingTop: '1.5em' }}>
                    <TextField
                      style={{ width: '250px', margin: '3px' }}
                      type="text"
                      label="ville"
                      variant="outlined"
                      onChange={}
                    />
                    <TextField
                      style={{ width: '250px', margin: '3px' }}
                      type="text"
                      label="pays"
                      variant="outlined"
                      onChange={}
                    />
                    <TextField
                      style={{ width: '25Opx', margin: '3px' }}
                      type="text"
                      label="addresse"
                      variant="outlined"
                      onChange={}
                    />
                  </Grid>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <Grid xs={12}>
                    <h3>information directeur : {activeStep} </h3>
                    <Grid style={{ paddingTop: '2em' }}>
                      <TextField
                        style={{ width: '250px', margin: '3px' }}
                        type="text"
                        label="nom"
                        variant="outlined"
                      />
                      <TextField
                        style={{ width: '25Opx', margin: '3px' }}
                        type="text"
                        label="prenom"
                        variant="outlined"
                      />
                      <TextField
                        style={{ width: '250px', margin: '3px' }}
                        type="email"
                        label="email"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
          
                </>
              )}

              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}></Typography>
                <Box
                  xs={10}
                  sx={{ display: 'flex', flexDirection: 'row', pt: 10 }}
                >
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    style={{ marginLeft: '20em' }}
                  >
                    {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
                  </Button>
                </Box>
              </React.Fragment>
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
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(BankModal);
