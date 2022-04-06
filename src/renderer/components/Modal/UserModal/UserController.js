import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Editor from '../../Ckeditor';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UserHelper from '../../../helpers/UserHelper';
import { useSnackbar } from 'notistack';
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState('disable');
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleCancel = () => {
    props.setStateAccount({
      ...props.stateAccount,
      ['state']: true,
      ['status']: 'Activer',
      ['comment']: '',
    });
    props.handleClose({ value: false, name: 'modalUserStatus' });
  };

  const traductionStatus = (status) => {
    if (status == 'suspend') {
      return 'suspendus';
    }
    if (status == 'disable') {
      return 'desactiver';
    }
    if (status == 'banish') {
      return 'bannis';
    }
  };
  return (
    <Dialog open={props.open} onClose={handleCancel} clo>
      <DialogTitle>mise a jour du status de compte</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            status account
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            row
            onChange={handleChange}
          >
            <FormControlLabel
              value="suspend"
              control={<Radio />}
              label="Suspendre"
            />
            <FormControlLabel
              value="banish"
              control={<Radio />}
              label="Bannir"
            />
            <FormControlLabel
              value="disable"
              control={<Radio />}
              label="Désactiver"
            />
          </RadioGroup>
        </FormControl>
        <DialogContentText>
          pour désactiver, suspendre ou bannir un compte merci de laisser un
          commentaire détaller
        </DialogContentText>
        <Editor {...props} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>annuler</Button>
        <Button
          disabled={props.stateAccount.comment.length < 30 ? true : false}
          onClick={() => {
            UserHelper.service
              .managementAccount(value, props.infoUser.uuid, props.dataEditor)
              .then(({ data }) => {
                enqueueSnackbar(data.message, {
                  variant: 'success',
                });
                props.setStateAccount({
                  ...props.stateAccount,
                  ['state']: false,
                  ['status']: traductionStatus(value),
                });
              })
              .catch(() => {
                enqueueSnackbar("une erreur c'est produite", {
                  variant: 'error',
                });
              });
            props.handleClose({ value: false, name: 'modalUserStatus' });
          }}
        >
          valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}
