import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemIcon
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotesIcon from '@material-ui/icons/Notes';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
        <Paper className={classes.paper}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              key={1}
              onClick={() => {
                setSelectedRecord(null);
                setRecordType(Names.ALL);
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItem>
            <ListItem
              button
              key={2}
              onClick={() => {
                setSelectedRecord(null);
                setRecordType(Names.CREDIT_CARD);
              }}
            >
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
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
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
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
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary="Secure Note" />
            </ListItem>
            <ListItem
              button
              disabled={recordType === Names.ALL}
              onClick={() => addNewRecord()}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid key={1} item xs={12} sm={4}>
        <Paper className={classes.paper}>
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
        </Paper>
      </Grid>
      <Grid key={2} item xs={12} sm={4}>
        <Paper className={classes.paper}>
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
