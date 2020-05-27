import React from 'react';
import { TextField } from '@material-ui/core';
import styles from './LoginInfo.css';

type Props = {
  mode: string;
  dataRep: any;
};

export default function LoginInfo({ dataRep, mode }: Props) {
  return (
    <div className={styles.container} data-tid="container">
      <TextField
        label="Username"
        defaultValue={dataRep.username}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.username = event.target.value;
        }}
      />
      <TextField
        label="Password"
        defaultValue={dataRep.password}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.password = event.target.value;
        }}
      />
      <TextField
        label="Url"
        defaultValue={dataRep.url}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.url = event.target.value;
        }}
      />
    </div>
  );
}
