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


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState('desactiver');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleCancel = () => {
    props.setStateAccount({
      ...props.stateAccount,
      ['state']: true,
    });
    props.handleClose({ value: false, name: 'modalUserStatus' });
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
              value="suspendre"
              control={<Radio />}
              label="Suspendre"
            />
            <FormControlLabel
              value="bannir"
              control={<Radio />}
              label="Bannir"
            />
            <FormControlLabel
              value="desactiver"
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
          disabled={props.dataEditor.length < 30 ? true : false}
          onClick={() =>
            props.handleClose({ value: false, name: 'modalUserStatus' })
          }
        >
          valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}
