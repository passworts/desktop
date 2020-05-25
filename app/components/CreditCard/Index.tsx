import React from 'react';
import { Button } from '@material-ui/core';
import styles from './CreditCard.css';

type updateFunctionType = (arg0: string) => void;
type Props = {
  obtainData: updateFunctionType;
};

export default function CreditCard({ obtainData }: Props) {
  const data = 'name_str';
  return (
    <div className={styles.container} data-tid="container">
      <h5>Cardholder Name</h5>
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
