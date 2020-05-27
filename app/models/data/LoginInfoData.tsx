import IBaseData from './IBaseData';

export default class LoginInfoData implements IBaseData {
  id = '';

  type = '2';

  name = '';

  favorite = '';

  note = '';

  username = '';

  password = '';

  url = '';

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
      username: null,
      password: null,
      url: null
    }
  });

  jsonObjectToData = (jobj: any) => {
    const {
      id,
      type,
      name,
      favorite,
      note,
      attributes: { username, password, url }
    } = jobj;

    this.id = id;
    this.type = type;
    this.name = name;
    this.favorite = favorite;
    this.note = note;
    this.username = username;
    this.password = password;
    this.url = url;
  };

  dataToJsonObject = () => ({
    id: this.id,
    type: this.type,
    name: this.name,
    favorite: this.favorite,
    note: this.note,
    attributes: {
      username: this.username,
      password: this.password,
      url: this.url
    }
  });
}
