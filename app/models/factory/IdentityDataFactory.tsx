import DataFactory from './DataFactory';
import IdentityData from '../data/IdentityData';

export default class IdentityDataFactory implements DataFactory {
  private jobj: any;

  createData = () => {
    return new IdentityData(this.jobj);
  };

  constructor(jobj: any) {
    this.jobj = jobj;
  }
}
