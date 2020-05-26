export default interface IBaseData {
  dataToJsonObject(): any;
  jsonObjectToData(jobj: object): void;
  makeSkeleton(): any;
}
