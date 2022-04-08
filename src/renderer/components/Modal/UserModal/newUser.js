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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
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

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
  }
`;

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const steps = ['information utilisateur', 'ouverture compte', 'Recapitulatif'];
export default function newUser(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [prenom, setPrenom] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [addresse, setAddresse] = React.useState('');
  const [ville, setVille] = React.useState('');
  const [pays, setPays] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [naissance, setNaissance] = React.useState('');
  const [dataProvisoir, setDataProvoir] = React.useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [createAccount, setCreateAccount] = useState({
    principal: true,
    epargne: false,
    pro: false,
  });
  const [depot, setDepot] = useState({
    principal: undefined,
    epargne: undefined,
    pro: undefined,
  });
  const [optionPro, setOptionPro] = React.useState({
    optionApi: false,
    optionPrelevement: false,
    optionEmployee: false,
  });
  function createData(name, value, fat = null) {
    return { name, value, fat };
  }

  const identite = [
    createData('nom', nom),
    createData('prenom', prenom),
    createData('date de naissance', naissance),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  let contact = [
    createData('email', email),
    createData('numero', tel),
    createData('adress', addresse + '' + ville + ',' + pays),
  ];

  const compte = [
    createAccount.principal
      ? createData(
          'compte principal',
          '',
          depot.principal ? depot.principal : 0
        )
      : createData('', '', ''),
    createAccount.pro
      ? createData(
          'compte pro',
          `${optionPro.optionApi ? 'acces Api, ' : ''}  ${
            optionPro.optionEmployee ? 'compte employer, ' : ''
          }${optionPro.optionPrelevement ? 'prelevement,' : ''}`,
          depot.pro ? depot.pro : 0
        )
      : createData('', '', ''),
    ,
    createAccount.epargne
      ? createData('compte epargne', '', depot.epargne ? depot.epargne : 0)
      : createData('', '', ''),
  ];

  const handleClickOpen = () => {
    props.setOpen(true);
  };
  const handleClose = () => {
    props.setOpen(false);
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
      if(activeStep ==3){
          /**
           * ici le hanleSubmit
           */
          resetData(),
          props.setOpen(false)
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

  /**
   * cette fonction nous permet de remettre les valeur initial en cas d'anulation de modification
   */
  const resetData = () => {
    setPrenom('');
    setNom('');
    setAddresse('');
    setVille('');
    setPays('');
    setEmail('');
    setTel('');
    setNaissance('');
    setDataProvoir('');
    setActiveStep(0);
    setDepot({
      principal: undefined,
      epargne: undefined,
      pro: undefined,
    });
    setOptionPro({
      optionApi: false,
      optionPrelevement: false,
      optionEmployee: false,
    });
    setCreateAccount({
      principal: true,
      epargne: false,
      pro: false,
    });
  };
  const handleCancel = () => {
    resetData();
    props.setOpen(false);
  };
  const handleSubmit = () => {
    let user = {
      name: nom,
      forename: prenom,
      address: addresse,
      city: ville,
      country: pays,
      email: email,
      birthday: naissance,
    };

    let account = {
      principal: createAccount.principal
        ? {
            depot: depot.principal ? depot.principal : 0,
          }
        : undefined,
      epargne: createAccount.epargne
        ? {
            depot: depot.epargne ? depot.epargne : 0,
          }
        : undefined,
      pro: createAccount.pro
        ? {
            depot: depot.pro ? depot.pro : 0,
            option: {
              api: optionPro.optionApi,
              prelevement: optionPro.optionPrelevement,
              employee: optionEmployee,
            },
          }
        : undefined,
    };
  };

  const handleChangePro = (event) => {
    setOptionPro({
      ...optionPro,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeAccount = (event) => {
    setCreateAccount({
      ...createAccount,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <BootstrapDialog
      maxWidth={'md'}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCancel}>
        formulaire nouveau client
      </BootstrapDialogTitle>
      <DialogContent
        dividers
        style={{
          widthMin: '750px',
          padding: 0,
          height: '420px',
          width: '840px',
        }}
      >
        <Grid container justifyContent={'center'}>
          <Stepper
            activeStep={activeStep}
            style={{ padding: 0, marginBottom: 23 }}
          >
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
        </Grid>
        {!activeStep && (
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
        )}

        {activeStep == 1 && (
          <Grid container>
            <Grid item xs={4}>
              <ListItem>
                <FormControl
                  style={{
                    paddingBottom: 10,
                    margin: 34,
                    flexDirection: 'row',
                    padding: 10,
                  }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">compte Principale</FormLabel>
                  <FormControlLabel
                    style={{}}
                    labelPlacement="top"
                    control={
                      <Switch checked={true} name="state" color="success" />
                    }
                    label={''}
                  />
                  <TextField
                    id="standard-number"
                    type="number"
                    style={{ width: 76 }}
                    placeholder={'dépot'}
                    onChange={(e) => {
                      setDepot((curent) => {
                        return { ...curent, principal: e.target.value };
                      });
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={4}>
              <ListItem>
                <FormControl
                  style={{
                    paddingBottom: 10,
                    margin: 34,
                    flexDirection: 'row',
                    padding: 10,
                  }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">compte D'épargne</FormLabel>
                  <FormControlLabel
                    style={{}}
                    labelPlacement="top"
                    control={
                      <Switch
                        checked={createAccount.epargne}
                        onChange={handleChangeAccount}
                        name="epargne"
                        color="success"
                      />
                    }
                    label={''}
                  />
                  <TextField
                    id="standard-number"
                    type="number"
                    style={{ width: 76 }}
                    placeholder={'dépot'}
                    onChange={(e) => {
                      setDepot((curent) => {
                        return { ...curent, epargne: e.target.value };
                      });
                    }}
                    disabled={!createAccount.epargne ? true : false}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={4}>
              <ListItem>
                <FormControl
                  style={{
                    paddingBottom: 10,
                    margin: 34,
                    flexDirection: 'row',
                    padding: 10,
                  }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">compte Pro</FormLabel>
                  <FormControlLabel
                    style={{}}
                    labelPlacement="top"
                    control={
                      <Switch
                        checked={createAccount.pro}
                        onChange={handleChangeAccount}
                        name="pro"
                        color="success"
                      />
                    }
                    label={''}
                  />

                  <TextField
                    id="standard-number"
                    type="number"
                    style={{ width: 76 }}
                    placeholder={'dépot'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setDepot((curent) => {
                        return { ...curent, pro: e.target.value };
                      });
                    }}
                    disabled={!createAccount.pro ? true : false}
                    variant="standard"
                  />
                </FormControl>
              </ListItem>
            </Grid>
          </Grid>
        )}
        {createAccount.pro && activeStep == 1 && (
          <FormControl
            required
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Option compte pro :</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={optionPro.optionApi}
                    onChange={handleChangePro}
                    name="optionApi"
                  />
                }
                label="acces api"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={optionPro.optionPrelevement}
                    onChange={handleChangePro}
                    name="optionPrelevement"
                  />
                }
                label="Prelevement"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={optionPro.optionEmployee}
                    onChange={handleChangePro}
                    name="optionEmployee"
                  />
                }
                label="compte employer"
              />
            </FormGroup>
          </FormControl>
        )}

        {activeStep == 2 && (
          <>
            <Grid container>
              <Grid item xs={5} style={{ margin: 20 }}>
                <Root sx={{ maxWidth: '100%', width: 500 }}>
                  <table aria-label="custom pagination table">
                    <thead style={{ width: '90%' }}>
                      <th>information contact</th>
                    </thead>
                    <tbody>
                      {contact.map((row) => (
                        <tr key={row.name}>
                          <td style={{ width: 600 }}>{row.name}</td>
                          <td style={{ width: 800 }} align="right">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                </Root>
              </Grid>
              <Grid item xs={5} style={{ margin: 20 }}>
                <Root sx={{ maxWidth: '100%', width: 500 }}>
                  <table aria-label="custom pagination table">
                    <thead>
                      <th>information identitaire</th>
                    </thead>
                    <tbody>
                      {identite.map((row) => (
                        <tr key={row.name}>
                          <td style={{ width: 700 }}>{row.name}</td>
                          <td style={{ width: 800 }} align="right">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                </Root>
              </Grid>
            </Grid>
            <Grid container>
              <Root sx={{ maxWidth: '100%', width: 350 }}>
                <table aria-label="custom pagination table">
                  <thead>
                    <th>compte bancaire</th>
                    <th>option</th>
                    <th>depot</th>
                  </thead>
                  <tbody>
                    {compte.map((row) =>
                      row.name != '' ? (
                        <tr key={row.name}>
                          <td style={{ width: 700 }}>{row.name}</td>
                          <td style={{ width: 1000 }} align="right">
                            {row.value == '' ? 'aucune option' : row.value}
                          </td>
                          <td style={{ width: 200 }} align="right">
                            {row.fat}
                          </td>
                        </tr>
                      ) : (
                        <tr></tr>
                      )
                    )}
                  </tbody>
                  <tfoot>
                    <tr></tr>
                  </tfoot>
                </table>
              </Root>
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'red' }} onClick={handleCancel}>
          Annuler
        </Button>
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
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
