import IBaseData from '../data/IBaseData';

export default interface DataFactory {
  createData(): IBaseData;
}
