import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import CreditCard from '../CreditCard/Index';
import styles from './Record.css';
import Names from '../../constants/names.json';
import BlankCard from '../BlankCard/Index';
import LoginInfo from '../LoginInfo/Index';
import SecureNote from '../SecureNote/Index';

// type updateFunctionType = (arg0: string) => void;
type Props = {
  dataRepInput: any;
  operations: any;
};

export default function Record({
  dataRepInput,
  operations: { deleteData, editData }
}: Props) {
  const dataRep = dataRepInput;
  const [mode, setMode] = useState('view');
  const {
    type
    // Will have history in the future
  } = dataRep;
  const chooseType = () => {
    switch (type) {
      case Names.CREDIT_CARD:
        return <CreditCard dataRepInput={dataRep} mode={mode} />;
      case Names.LOGIN_INFO:
        return <LoginInfo dataRepInput={dataRep} mode={mode} />;
      case Names.SECURE_NOTE:
        return <SecureNote dataRepInput={dataRep} mode={mode} />;
      default:
        return <BlankCard />;
    }
  };

  return (
    <div className={styles.container} data-tid="container">
      <TextField
        label="Name"
        defaultValue={dataRep.name}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.name = event.target.value;
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
        defaultValue={dataRep.note}
        disabled={mode === 'view'}
        onChange={(event: any) => {
          dataRep.note = event.target.value;
        }}
      />
      {chooseType()}
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => deleteData(dataRep)}
      >
        Delete
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => {
          setMode('view');
          editData(dataRep);
        }}
      >
        Save
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => setMode('edit')}
      >
        Edit
      </Button>
    </div>
  );
}
