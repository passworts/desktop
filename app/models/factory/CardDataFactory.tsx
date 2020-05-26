import DataFactory from './DataFactory';
import CardData from '../data/CardData';

export default class CardDataFactory implements DataFactory {
  private jobj: any;

  createData = () => {
    return new CardData(this.jobj);
  };

  constructor(jobj: any) {
    this.jobj = jobj;
  }
}
