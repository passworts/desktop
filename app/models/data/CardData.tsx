import IBaseData from './IBaseData';

export default class CardData implements IBaseData {
  id = '';

  type = '1';

  name = 'New Record';

  favorite = '';

  note = '';

  cardHolderName = '';

  cardNumber = '';

  brand = '';

  expMonth = '';

  expYear = '';

  securityCode = '';

  constructor(jobj: any) {
    if (jobj) {
      this.jsonObjectToData(jobj);
    }
  }

  makeSkeleton = () => ({
    id: null,
    type: null,
    name: null,
    favorite: null,
    note: null,
    attributes: {
      cardHolderName: null,
      brand: null,
      cardNumber: null,
      expMonth: null,
      expYear: null,
      securityCode: null
    }
  });

  jsonObjectToData = (jobj: any) => {
    const {
      id,
      type,
      name,
      favorite,
      note,
      attributes: {
        cardHolderName,
        brand,
        cardNumber,
        expMonth,
        expYear,
        securityCode
      }
    } = jobj;

    this.id = id;
    this.type = type;
    this.name = name;
    this.favorite = favorite;
    this.note = note;
    this.cardHolderName = cardHolderName;
    this.brand = brand;
    this.cardNumber = cardNumber;
    this.expMonth = expMonth;
    this.expYear = expYear;
    this.securityCode = securityCode;
  };

  dataToJsonObject = () => ({
    id: this.id,
    type: this.type,
    name: this.name,
    favorite: this.favorite,
    note: this.note,
    attributes: {
      cardHolderName: this.cardHolderName,
      brand: this.brand,
      cardNumber: this.cardNumber,
      expMonth: this.expMonth,
      expYear: this.expYear,
      securityCode: this.securityCode
    }
  });
}
