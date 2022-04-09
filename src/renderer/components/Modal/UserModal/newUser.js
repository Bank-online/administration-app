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
import validation from '../../../validations/UserValidation';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const steps = ['information utilisateur', 'ouverture compte', 'Recapitulatif'];
export default function newUser(props) {
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(true);
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

  const [link, setLink] = useState(null);

  const handleCheckErorr = (name, value) => {
    setError({
      ...error,
      [name]: value,
    });
  };
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

  const handleNext = async () => {
    if (activeStep == 0) {
      let user = {
        name: nom,
        forename: prenom,
        address: addresse,
        city: ville,
        country: pays,
        email: email,
        birthday: naissance,
        phoneNumber: tel,
      };
      if (await validation.validateUsers(user)) {
        setError(await validation.validateUsers(user));
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
      console.log(contentError);
      if (contentError) {
        return;
      }
    }
    if (activeStep == 2) {
      /**
       * ici le hanleSubmit
       */
      resetData(), props.setOpen(false);
      return;
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
  const handleSubmit = () => {
    let user = {
      name: nom,
      forename: prenom,
      address: addresse,
      city: ville,
      country: pays,
      email: email,
      birthday: naissance,
      phoneNumber: tel,
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

  const checkEmail = async (email) => {};

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
                    if (await validation.validateEmail(email, true)) {
                      UserHelper.service
                        .checkExisteUser({ email: e.target.value })
                        .then(({ data }) => {
                          if (data.userExiste) {
                            setLink(data.userExiste);
                            handleCheckErorr(
                              'email',
                              'cette adrress email est deja utiliser'
                            );
                          } else {
                            handleCheckErorr('email', false);
                            setLink(null);
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
                        email == '' || !email
                          ? 'champs requis'
                          : 'email invalide'
                      );
                    } else {
                      UserHelper.service
                        .checkExisteUser({ email: e.target.value })
                        .then(({ data }) => {
                          if (data.userExiste) {
                            setLink(data.userExiste);
                            handleCheckErorr(
                              'email',
                              'cette adrress email est deja utiliser'
                            );
                          } else {
                            setLink(null);
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
                    if (
                      !(await validation.validateFielsString(addresse, true))
                    ) {
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
        {link && (
          <p>
            <strong style={{ color: 'red' }}>
              cette utilisateur est deja titulaire d'un compte :
            </strong>
            <Tooltip
              title="Acceder au profile de l'utilisateur"
              arrow
              placement="top"
            >
              <Link
                href="#"
                color="inherit"
                onClick={() => {
                  navigate(`/user/${link.uuid}`, {
                    state: {},
                  });
                }}
              >
                {link.name}
              </Link>
            </Tooltip>
          </p>
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

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={link ? true : false}
        >
          {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
