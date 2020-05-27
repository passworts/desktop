import DataFactory from './DataFactory';
import LoginInfoData from '../data/LoginInfoData';

export default class LoginInfoDataFactory implements DataFactory {
  private jobj: any;

  createData = () => {
    return new LoginInfoData(this.jobj);
  };

  constructor(jobj: any) {
    this.jobj = jobj;
  }
}
