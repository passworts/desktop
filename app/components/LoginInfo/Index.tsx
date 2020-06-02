import React, { useState } from 'react';
import {
  TextField,
  Input,
  InputAdornment,
  IconButton,
  makeStyles
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import styles from './LoginInfo.css';

type Props = {
  mode: string;
  dataRepInput: any;
};
const useStyles = makeStyles(theme => ({
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
    <div className={styles.container} data-tid="container">
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
      <Input
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        defaultValue={dataRep.password}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.password = event.target.value;
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
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
