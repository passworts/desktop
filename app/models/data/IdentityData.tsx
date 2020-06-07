import IBaseData from './IBaseData';

export default class IdentityData implements IBaseData {
  id = '';

  type = '3';

  name = 'New Identity';

  favorite = '';

  note = '';

  firstname = '';

  middlename = '';

  lastname = '';

  username = '';

  company = '';

  passportNumber = '';

  licenseNumber = '';

  email = '';

  phone = '';

  address1 = '';

  address2 = '';

  address3 = '';

  cityTown = '';

  stateProvince = '';

  zipCode = '';

  country = '';

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
      firstname: null,

      middlename: null,

      lastname: null,

      username: null,

      company: null,

      passportNumber: null,

      licenseNumber: null,

      email: null,

      phone: null,

      address1: null,

      address2: null,

      address3: null,

      cityTown: null,

      stateProvince: null,

      zipCode: null,

      country: null
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
        firstname,

        middlename,

        lastname,

        username,

        company,

        passportNumber,

        licenseNumber,

        email,

        phone,

        address1,

        address2,

        address3,

        cityTown,

        stateProvince,

        zipCode,

        country
      }
    } = jobj;

    this.id = id;
    this.type = type;
    this.name = name;
    this.favorite = favorite;
    this.note = note;
    this.firstname = firstname;

    this.middlename = middlename;

    this.lastname = lastname;

    this.username = username;

    this.company = company;

    this.passportNumber = passportNumber;

    this.licenseNumber = licenseNumber;

    this.email = email;

    this.phone = phone;

    this.address1 = address1;

    this.address2 = address2;

    this.address3 = address3;

    this.cityTown = cityTown;

    this.stateProvince = stateProvince;

    this.zipCode = zipCode;

    this.country = country;
  };

  dataToJsonObject = () => ({
    id: this.id,
    type: this.type,
    name: this.name,
    favorite: this.favorite,
    note: this.note,
    attributes: {
      firstname: this.firstname,

      middlename: this.middlename,

      lastname: this.lastname,

      username: this.username,

      company: this.company,

      passportNumber: this.passportNumber,

      licenseNumber: this.licenseNumber,

      email: this.email,

      phone: this.phone,

      address1: this.address1,

      address2: this.address2,

      address3: this.address3,

      cityTown: this.cityTown,

      stateProvince: this.stateProvince,

      zipCode: this.zipCode,

      country: this.country
    }
  });
}
