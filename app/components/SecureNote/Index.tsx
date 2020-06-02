import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import styles from './SecureNote.css';

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
export default function SecureNote({ dataRepInput, mode }: Props) {
  const dataRep = dataRepInput;
  const [name, setName] = useState(dataRep.name);
  const [note, setNote] = useState(dataRep.note);
  const classes = useStyles();
  return (
    <div className={styles.container} data-tid="container">
      <TextField
        label="Name"
        value={name}
        className={classes.textField}
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
        className={classes.textField}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.note = event.target.value;
          setNote(event.target.value);
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        className={classes.textField}
        multiline
        rows={10}
        defaultValue={dataRep.content}
        disabled={mode === 'view'}
        variant="outlined"
        onChange={(event: any) => {
          dataRep.content = event.target.value;
        }}
      />
    </div>
  );
}
