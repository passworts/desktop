import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import styles from './PassWort.css';
import Record from '../Record/Index';
import Names from '../../constants/names.json';
import dataService from '../../services/DataService';

export default function PassWort() {
  const readRecords = dataService.getRecords();
  const [recordType, setRecordType] = useState<string>(Names.ALL);
  const [records, setRecords] = useState<Array<any>>(readRecords);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const deleteData = (data: any) => {
    dataService.deleteRecord(data);
    setRecords(dataService.getRecords());
  };
  const editData = (data: any) => {
    dataService.editRecord(data);
    setRecords(dataService.getRecords());
  };
  const addData = (data: any) => {
    dataService.addRecord(data);
    setRecords(dataService.getRecords());
  };
  const operations = {
    deleteData,
    editData,
    addData
  };

  const addNewRecord = () => {
    if (recordType !== Names.ALL) {
      addData(dataService.initNewRecord(recordType));
    }
  };

  return (
    <div className={styles.container} data-tid="container">
      <h3>Data</h3>
      {selectedRecord !== null ? (
        <Record dataRepInput={selectedRecord} operations={operations} />
      ) : (
        <h5>Nothing is selected</h5>
      )}
      <List component="nav" aria-label="main mailbox folders">
        {records
          .filter((r: any) => {
            const dataRep = r.dataToJsonObject();
            const { type } = dataRep;
            return recordType === Names.ALL ? true : type === recordType;
          })
          .map((r: any) => {
            const dataRep = r.dataToJsonObject();
            const { id } = dataRep;
            return (
              <ListItem
                button
                key={id}
                onClick={() => {
                  setSelectedRecord(r);
                }}
              >
                <ListItemText primary={id} />
              </ListItem>
            );
          })}
      </List>
      <div>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setRecordType(Names.ALL)}
        >
          All Records
        </Button>
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
        <Button
          disabled={recordType === Names.ALL}
          color="primary"
          variant="outlined"
          onClick={() => addNewRecord()}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
