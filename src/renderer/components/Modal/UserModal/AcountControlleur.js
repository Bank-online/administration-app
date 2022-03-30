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
import * as React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ModalGestionAccount from './UserController';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
  const [stateAccount, setStateAccount] = React.useState({
    state: true,
  });
  const [modal, setModal] = React.useState({
    modalUserStatus: false,
  });
  const [stateAccountComment, setStateAccountComment] = React.useState('');

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
    });

    if (!event.target.checked) {
      handleChangeStatus({
        value: !modal.modalUserStatus,
        name: 'modalUserStatus',
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
        <DialogTitle style={{ textAlign: 'center' ,flexDirection : "row"}} >
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
                          compte désactiver
                        </Typography>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: stateAccountComment,
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
              label={stateAccount.state ? 'Active' : 'Désactiver'}
            />
            <ModalGestionAccount
              open={modal.modalUserStatus}
              handleClose={handleChangeStatus}
              setStateAccount={setStateAccount}
              stateAccount={stateAccount}
              dataEditor={stateAccountComment}
              setDataEditor={setStateAccountComment}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
