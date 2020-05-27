import React from 'react';
import { TextField } from '@material-ui/core';
import styles from './CreditCard.css';

type Props = {
  mode: string;
  dataRepInput: any;
};

export default function CreditCard({ dataRepInput, mode }: Props) {
  const dataRep = dataRepInput;
  return (
    <div className={styles.container} data-tid="container">
      <TextField
        label="CardHolder Name"
        defaultValue={dataRep.cardHolderName}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.cardHolderName = event.target.value;
        }}
      />
      <TextField
        label="Brand"
        defaultValue={dataRep.brand}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.brand = event.target.value;
        }}
      />
      <TextField
        label="Card Number"
        defaultValue={dataRep.cardNumber}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.cardNumber = event.target.value;
        }}
      />
      <TextField
        label="Security Code"
        defaultValue={dataRep.securityCode}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.securityCode = event.target.value;
        }}
      />
      <TextField
        label="Expiry Month"
        defaultValue={dataRep.expMonth}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.expMonth = event.target.value;
        }}
      />
      <TextField
        label="Expiry Year"
        defaultValue={dataRep.expYear}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.expYear = event.target.value;
        }}
      />
    </div>
  );
}
