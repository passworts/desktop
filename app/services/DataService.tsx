import IDataService from './IDataService';
import DataFileIO from '../utils/DataFileIO';
import CardDataFactory from '../models/factory/CardDataFactory';
import LoginInfoDataFactory from '../models/factory/LoginInfoDataFactory';
import SecureNoteDataFactory from '../models/factory/SecureNoteDataFactory';

const shortid = require('shortid');

class DataService implements IDataService {
  records: any;

  constructor() {
    this.records = this.getRecordsFromFile();
  }

  persistToFile = () => {
    // TODO: Writes records to file
    // console.log('Persisting');
    // console.log(this.records);
  };

  getRecords = () => {
    return this.records;
  };

  getRecordsJson = () => {
    if (this.records) {
      return this.records().map((r: any) => r.dataToJsonObject());
    }
    return null;
  };

  parseJsonToObject = (jobj: any) => {
    const { type } = jobj;
    switch (type) {
      case '1':
        return new CardDataFactory(jobj);
      case '2':
        return new LoginInfoDataFactory(jobj);
      case '4':
        return new SecureNoteDataFactory(jobj);
      default:
        throw new Error('Invalid data type');
    }
  };

  getRecordsFromFile = () => {
    const { records } = DataFileIO.readInternalFile();
    const parsedRecordObjects = records.map((r: any) => {
      const factory = this.parseJsonToObject(r);
      return factory.createData();
    });
    return parsedRecordObjects;
  };

  addRecord = (record: any) => {
    const tmpR = record;
    // Should init a new id for rec
    tmpR.id = shortid.generate();
    this.records = [...this.records, tmpR];
    this.persistToFile();
  };

  initNewRecord = (type: string) => {
    switch (type) {
      case '1':
        return new CardDataFactory(null).createData();
      case '2':
        return new LoginInfoDataFactory(null).createData();
      case '4':
        return new SecureNoteDataFactory(null).createData();
      default:
        throw new Error('Invalid data type');
    }
  };

  deleteRecord = (record: any) => {
    this.records = this.records.filter((r: any) => {
      return r.id !== record.id;
    });
    this.persistToFile();
  };

  editRecord = (record: any) => {
    let idx = -1;
    for (let i = 0; i < this.records.length; i += 1) {
      const element = this.records[i];
      if (element.id === record.id) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      const tmpList = [...this.records];
      tmpList[idx] = record;
      this.records = tmpList;
      this.persistToFile();
    }
  };
}

const dataService = new DataService();

export default dataService;
