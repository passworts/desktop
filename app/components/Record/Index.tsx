import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CreditCard from '../CreditCard/Index';
import styles from './Record.css';
import Names from '../../constants/names.json';
import BlankCard from '../BlankCard/Index';
import LoginInfo from '../LoginInfo/Index';
import SecureNote from '../SecureNote/Index';
import Identity from '../Identity/Index';

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
    type,
    id
    // Will have history in the future
  } = dataRep;
  const chooseType = () => {
    switch (type) {
      case Names.CREDIT_CARD:
        return <CreditCard dataRepInput={dataRep} mode={mode} key={id} />;
      case Names.LOGIN_INFO:
        return <LoginInfo dataRepInput={dataRep} mode={mode} key={id} />;
      case Names.SECURE_NOTE:
        return <SecureNote dataRepInput={dataRep} mode={mode} key={id} />;
      case Names.IDENTITY:
        return <Identity dataRepInput={dataRep} mode={mode} key={id} />;
      default:
        return <BlankCard />;
    }
  };

  return (
    <div className={styles.container} data-tid="container">
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
