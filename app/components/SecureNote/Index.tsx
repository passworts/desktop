import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import styles from './SecureNote.css';

type Props = {
  mode: string;
  dataRepInput: any;
};

export default function SecureNote({ dataRepInput, mode }: Props) {
  const dataRep = dataRepInput;
  const [name, setName] = useState(dataRep.name);
  const [note, setNote] = useState(dataRep.note);
  return (
    <div className={styles.container} data-tid="container">
      <TextField
        label="Name"
        value={name}
        disabled={mode === 'view'}
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
        onChange={(event: any) => {
          dataRep.note = event.target.value;
          setNote(event.target.value);
        }}
      />
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
