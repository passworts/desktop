import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
export default function Identity({ dataRepInput, mode }: Props) {
  const dataRep = dataRepInput;
  const [name, setName] = useState(dataRep.name);
  const [note, setNote] = useState(dataRep.note);
  const classes = useStyles();

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
        label="Firstname"
        defaultValue={dataRep.firstname}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.firstname = event.target.value;
        }}
      />
      <TextField
        label="Middlename"
        defaultValue={dataRep.middlename}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.middlename = event.target.value;
        }}
      />
      <TextField
        label="Lastname"
        defaultValue={dataRep.lastname}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.lastname = event.target.value;
        }}
      />
      <TextField
        label="Lastname"
        defaultValue={dataRep.lastname}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.lastname = event.target.value;
        }}
      />
      <TextField
        label="Company"
        defaultValue={dataRep.company}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.company = event.target.value;
        }}
      />
      <TextField
        label="Passport No"
        defaultValue={dataRep.passportNumber}
        disabled={mode === 'view'}
        className={classes.textField}
        onChange={(event: any) => {
          dataRep.passportNumber = event.target.value;
        }}
      />
    </div>
  );
}
