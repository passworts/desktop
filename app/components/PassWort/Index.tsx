import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styles from './PassWort.css';
import Record from '../Record/Index';
import Names from '../../constants/names.json';
import DataService from '../../services/DataService';

export default function PassWort() {
  const [recordType, setRecordType] = useState<string>('');
  const [records, setRecords] = useState<Array<any>>([]);

  const addNewData = (a: string) => {
    setRecords([...records, { name: a }]);
  };
  const dataService = new DataService();
  const readRecords = dataService.getRecords();
  readRecords.map((r: any) => r.dataToJsonObject());

  return (
    <div className={styles.container} data-tid="container">
      <Record type={recordType} addNewData={addNewData} />
      <h3>Data</h3>
      <h3>Add</h3>
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
