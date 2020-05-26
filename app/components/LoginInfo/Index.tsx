import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './LoginInfo.css';

type updateFunctionType = (arg0: string) => void;
type Props = {
  obtainData: updateFunctionType;
};

export default function LoginInfo({ obtainData }: Props) {
  // TODO: login info data goes here
  const data = 'name_str';
  return (
    <div className={styles.container} data-tid="container">
      <h5>Login Info</h5>
      <TextField
        label="Username"
        onChange={event => obtainData(event.target.value)}
      />
      <TextField
        label="Password"
        onChange={event => obtainData(event.target.value)}
      />
      <TextField
        label="Url"
        onChange={event => obtainData(event.target.value)}
      />
      <Button
        color="primary"
        variant="outlined"
        onClick={() => obtainData(data)}
      >
        Save Data
      </Button>
    </div>
  );
}
