import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styles from './PassWort.css';
import Record from '../Record/Index';
import Names from '../../constants/names.json';

export default function PassWort() {
  const [recordType, setRecordType] = useState<string>('');
  const [records, setRecords] = useState<Array<Record<string, string>>>([]);

  const addNewData = (a: string) => {
    setRecords([...records, { name: a }]);
  };
  return (
    <div className={styles.container} data-tid="container">
      <h2>Saved Data</h2>
      <h3>Data goes here...</h3>
      <Record type={recordType} addNewData={addNewData} />
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setRecordType(Names.CREDIT_CARD)}
      >
        Credit Card
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setRecordType(Names.LOGIN_INFO)}
      >
        Login Info
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setRecordType(Names.SECURE_NOTE)}
      >
        Secure Note
      </Button>
    </div>
  );
}
