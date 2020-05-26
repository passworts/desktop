import IDataService from './IDataService';
import DataFileIO from '../utils/DataFileIO';
import CardDataFactory from '../models/factory/CardDataFactory';

export default class DataService implements IDataService {
  parseJsonToObject = (jobj: any) => {
    const { type } = jobj;
    switch (type) {
      case '1':
        return new CardDataFactory(jobj);
      default:
        throw new Error('Invalid data type');
    }
  };

  getRecords = () => {
    const { records } = DataFileIO.readInternalFile();
    const parsedRecordObjects = records.map((r: any) => {
      const factory = this.parseJsonToObject(r);
      return factory.createData();
    });
    return parsedRecordObjects;
  };

  addRecord = (record: any) => {
    const { records } = DataFileIO.readInternalFile();
    records.push(record);
  };
}
