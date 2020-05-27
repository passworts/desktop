import DataFactory from './DataFactory';
import SecureNoteData from '../data/SecureNoteData';

export default class SecureNoteDataFactory implements DataFactory {
  private jobj: any;

  createData = () => {
    return new SecureNoteData(this.jobj);
  };

  constructor(jobj: any) {
    this.jobj = jobj;
  }
}
