import IBaseData from './IBaseData';

export default class SecureNoteData implements IBaseData {
  id = '';

  type = '4';

  name = 'New Record';

  favorite = '';

  note = '';

  content = '';

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
      content: null
    }
  });

  jsonObjectToData = (jobj: any) => {
    const {
      id,
      type,
      name,
      favorite,
      note,
      attributes: { content }
    } = jobj;

    this.id = id;
    this.type = type;
    this.name = name;
    this.favorite = favorite;
    this.note = note;
    this.content = content;
  };

  dataToJsonObject = () => ({
    id: this.id,
    type: this.type,
    name: this.name,
    favorite: this.favorite,
    note: this.note,
    attributes: {
      content: this.content
    }
  });
}
