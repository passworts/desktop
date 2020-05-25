import React from 'react';
import CreditCard from '../CreditCard/Index';
import styles from './Record.css';
import Names from '../../constants/names.json';
import BlankCard from '../BlankCard/Index';
import LoginInfo from '../LoginInfo/Index';
import SecureNote from '../SecureNote/Index';

type updateFunctionType = (arg0: string) => void;
type Props = {
  addNewData: updateFunctionType;
  type: string;
};

export default function Record({ type, addNewData }: Props) {
  const obtainData = (r: string) => {
    addNewData(r);
  };
  const chooseType = () => {
    switch (type) {
      case Names.CREDIT_CARD:
        return <CreditCard obtainData={obtainData} />;
      case Names.LOGIN_INFO:
        return <LoginInfo obtainData={obtainData} />;
      case Names.SECURE_NOTE:
        return <SecureNote obtainData={obtainData} />;
      default:
        return <BlankCard />;
    }
  };
  return (
    <div className={styles.container} data-tid="container">
      <h4>{type}</h4>
      {chooseType()}
    </div>
  );
}
