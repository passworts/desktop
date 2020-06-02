import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type Props = {
  mode: string;
  dataRepInput: any;
};
const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: '90%'
  }
}));
export default function LoginInfo({ dataRepInput, mode }: Props) {
  const dataRep = dataRepInput;
  const [name, setName] = useState(dataRep.name);
  const [note, setNote] = useState(dataRep.note);
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <div className={classes.root} data-tid="container">
      <TextField
        label="Name"
        value={name}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.name = event.target.value;
          setName(event.target.value);
        }}
      />
      {/* <Checkbox
        defaultChecked={dataRep.favorite}
        color="primary"
        disabled={mode === 'view' ? true : false}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onChange={(event: any) => { dataRep.favorite = event.target.checked }}
      /> */}
      <TextField
        label="Note"
        value={note}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.note = event.target.value;
          setNote(event.target.value);
        }}
      />
      <TextField
        label="Username"
        defaultValue={dataRep.username}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.username = event.target.value;
        }}
      />
      <FormControl className={classes.textField}>
        <InputLabel
          htmlFor="standard-adornment-password"
          disabled={mode === 'view'}
        >
          Password
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          defaultValue={dataRep.password}
          disabled={mode === 'view'}
          onChange={(event: any) => {
            dataRep.password = event.target.value;
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disabled={mode === 'view'}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        label="Url"
        defaultValue={dataRep.url}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.url = event.target.value;
        }}
      />
    </div>
  );
}
