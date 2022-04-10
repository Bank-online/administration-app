import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ModalGestionAccount from './UserController';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import UserHelpers from '../../../helpers/UserHelper';
import { useSnackbar } from 'notistack';
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    classes={{ popper: className }}
    placement="top"
    style={{ margin: 0, fontSize: '1.7em' }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function AccountControlleur(props) {
  const { enqueueSnackbar } = useSnackbar();
  const statusAccount = () => {
    let info = {};
    if (
      !props.infoUser.isActive &&
      !props.infoUser.isSuspended &&
      !props.infoUser.deleted &&
      !props.infoUser.isBanned
    ) {
      return (info = {
        status: "demande d'ouverture",
        comment:
          "compte client en attent d'approbation pour l'ouverture du compte",
        state: false,
      });
    } else if (!props.infoUser.isActive) {
      info.status = 'Désactiver';
      info.comment = props.infoUser.comment;
      info.state = false;
      return info;
    } else if (props.infoUser.isSuspended) {
      info.status = 'Suspendus';
      info.comment = props.infoUser.comment;
      info.state = false;
      return info;
    } else if (props.infoUser.deleted) {
      info.status = 'Supprimer';
      info.comment = props.infoUser.comment;
      info.state = false;
      return info;
    } else if (props.infoUser.isBanned) {
      info.status = 'Bannis';
      info.comment = props.infoUser.comment;
      info.state = false;
      return info;
    }
    return (info = {
      status: 'Activer',
      comment: '',
      state: true,
    });
  };
  const [stateAccount, setStateAccount] = React.useState({
    state: statusAccount().state,
    comment: statusAccount().comment,
    status: statusAccount().status,
  });
  const [modal, setModal] = React.useState({
    modalUserStatus: false,
  });
  const [stateAccountComment, setStateAccountComment] = React.useState(
    statusAccount().comment
  );

  const handleChangeStatus = (modale) => {
    setModal({
      ...modal,
      [modale.name]: modale.value,
    });
  };
  const handleChange = (event) => {
    setStateAccount({
      ...stateAccount,
      [event.target.name]: event.target.checked,
      ['status']: 'Activer',
    });

    if (!event.target.checked) {
      handleChangeStatus({
        value: !modal.modalUserStatus,
        name: 'modalUserStatus',
      });
      setStateAccount({
        ...stateAccount,
        [event.target.name]: event.target.checked,
        ['status']: 'Désactiver',
      });
    } else {
      UserHelpers.service
        .managementAccount('active', props.infoUser.uuid)
        .then(({ data }) => {
          enqueueSnackbar(data.message, {
            variant: 'success',
          });
        })
        .catch(() => {
          enqueueSnackbar('une erreur est survenus ', {
            variant: 'error',
          });
        });
    }
  };
  const handleClose = () => {
    props.setOpenControlleur(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.openControlleur}
        onClose={handleClose}
      >
        <DialogTitle style={{ textAlign: 'center', flexDirection: 'row' }}>
          <div>controlleur utilisateur</div>
          {/* <div style={{ float: 'right' }}>
          <IconButton onClick={handleClose} color="secondary" style={{}}>
            <CloseIcon />
          </IconButton>
        </div>
           */}
        </DialogTitle>
        <DialogContent>
          <FormControl
            style={{ textAlign: 'center', paddingBottom: 10 }}
            component="fieldset"
            variant="standard"
          >
            <FormLabel component="legend">status compte utilisateur</FormLabel>
            <FormControlLabel
              style={{ justifyContent: 'center' }}
              labelPlacement="top"
              control={
                stateAccount.state ? (
                  <Switch
                    checked={stateAccount.state}
                    onChange={handleChange}
                    name="state"
                    color="success"
                  />
                ) : (
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          Compte {stateAccount.status}
                        </Typography>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: stateAccount.comment,
                          }}
                        />
                      </React.Fragment>
                    }
                  >
                    <Switch
                      checked={stateAccount.state}
                      onChange={handleChange}
                      name="state"
                      color="success"
                    />
                  </HtmlTooltip>
                )
              }
              label={stateAccount.status}
            />
            <ModalGestionAccount
              open={modal.modalUserStatus}
              handleClose={handleChangeStatus}
              setStateAccount={setStateAccount}
              stateAccount={stateAccount}
              dataEditor={stateAccount.comment}
              setDataEditor={setStateAccountComment}
              {...props}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
