export default interface IDataService {
  parseJsonToObject(jobj: object): any;
  getRecordsFromFile(): any;
  getRecords(): any;
  getRecordsJson(): any;
}
