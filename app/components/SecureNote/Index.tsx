import React from 'react';
import { TextField } from '@material-ui/core';
import styles from './SecureNote.css';

type Props = {
  mode: string;
  dataRepInput: any;
};

export default function SecureNote({ dataRepInput, mode }: Props) {
  const dataRep = dataRepInput;
  return (
    <div className={styles.container} data-tid="container">
      <TextField
        label="Content"
        defaultValue={dataRep.content}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.content = event.target.value;
        }}
      />
    </div>
  );
}
