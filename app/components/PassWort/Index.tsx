import React, { useState } from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TypeIcon from '../TypeIcon/Index';
import Record from '../Record/Index';
import Names from '../../constants/names.json';
import dataService from '../../services/DataService';

export default function PassWort() {
  dataService.refreshRecords();
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
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },

    paper: {
      textAlign: 'center',
      padding: theme.spacing(1)
      // height: 140,
      // width: 200,
    },
    control: {
      padding: theme.spacing(2)
    }
  }));
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={0}>
      <Grid key={0} item xs={12} sm={4}>
        <Paper className={classes.paper} elevation={0}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              key={1}
              onClick={() => {
                setSelectedRecord(null);
                setRecordType(Names.ALL);
              }}
            >
              <TypeIcon type={Names.ALL} />
              <ListItemText primary="All Records" />
            </ListItem>
            <ListItem
              button
              key={2}
              onClick={() => {
                setSelectedRecord(null);
                setRecordType(Names.CREDIT_CARD);
              }}
            >
              <TypeIcon type={Names.CREDIT_CARD} />
              <ListItemText primary="Credit Card" />
            </ListItem>
            <ListItem
              button
              key={3}
              onClick={() => {
                setSelectedRecord(null);
                setRecordType(Names.LOGIN_INFO);
              }}
            >
              <TypeIcon type={Names.LOGIN_INFO} />
              <ListItemText primary="Login Info" />
            </ListItem>
            <ListItem
              button
              key={4}
              onClick={() => {
                setSelectedRecord(null);
                setRecordType(Names.SECURE_NOTE);
              }}
            >
              <TypeIcon type={Names.SECURE_NOTE} />
              <ListItemText primary="Secure Note" />
            </ListItem>
            <ListItem
              button
              key={5}
              disabled={recordType === Names.ALL}
              onClick={() => addNewRecord()}
            >
              <TypeIcon type={Names.ADD_BUTTON} />
              <ListItemText primary="Add" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid key={1} item xs={12} sm={4}>
        <Paper className={classes.paper} elevation={0}>
          <List component="nav" aria-label="main mailbox folders">
            {records
              .filter((r: any) => {
                const dataRep = r.dataToJsonObject();
                const { type } = dataRep;
                return recordType === Names.ALL ? true : type === recordType;
              })
              .map((r: any) => {
                const dataRep = r.dataToJsonObject();
                const { id, type, name } = dataRep;
                return (
                  <ListItem
                    button
                    key={id}
                    onClick={() => {
                      setSelectedRecord(r);
                    }}
                  >
                    <TypeIcon type={type} />
                    <ListItemText primary={name} />
                  </ListItem>
                );
              })}
          </List>
        </Paper>
      </Grid>
      <Grid key={2} item xs={12} sm={4}>
        <Paper className={classes.paper} elevation={0}>
          {selectedRecord !== null ? (
            <Record dataRepInput={selectedRecord} operations={operations} />
          ) : (
            <h5>Nothing is selected</h5>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
