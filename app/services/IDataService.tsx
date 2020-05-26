export default interface IDataService {
  parseJsonToObject(jobj: object): any;
  getRecords(): any;
}
