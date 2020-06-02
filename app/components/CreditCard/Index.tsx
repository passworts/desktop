import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './CreditCard.css';

type Props = {
  mode: string;
  dataRepInput: any;
};
const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    width: '90%'
  }
}));
export default function CreditCard({ dataRepInput, mode }: Props) {
  const dataRep = dataRepInput;
  const [name, setName] = useState(dataRep.name);
  const [note, setNote] = useState(dataRep.note);
  const classes = useStyles();
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
        label="CardHolder Name"
        defaultValue={dataRep.cardHolderName}
        className={classes.textField}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.cardHolderName = event.target.value;
        }}
      />
      <TextField
        label="Brand"
        defaultValue={dataRep.brand}
        className={classes.textField}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.brand = event.target.value;
        }}
      />
      <TextField
        label="Card Number"
        defaultValue={dataRep.cardNumber}
        className={classes.textField}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.cardNumber = event.target.value;
        }}
      />
      <TextField
        label="Security Code"
        defaultValue={dataRep.securityCode}
        className={classes.textField}
        disabled={mode === 'view'}
        type="password"
        onChange={(event: any) => {
          dataRep.securityCode = event.target.value;
        }}
      />
      <TextField
        label="Expiry Month"
        defaultValue={dataRep.expMonth}
        className={classes.textField}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.expMonth = event.target.value;
        }}
      />
      <TextField
        label="Expiry Year"
        defaultValue={dataRep.expYear}
        className={classes.textField}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.expYear = event.target.value;
        }}
      />
    </div>
  );
}
