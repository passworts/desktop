import fs from 'fs';

type Content = {
  attrName: string;
  attrValue: string;
};

class DataFileIO {
  private path: string;

  private attrsWhiteList = [
    'usernameHashed',
    'passwordHashed',
    'usernameSalt',
    'passwordSalt',
    'history'
  ];

  constructor() {
    this.path = String(process.env.USERDATA_PATH);
    if (!fs.existsSync(`${this.path}/vault`)) {
      fs.mkdirSync(`${this.path}/vault`);
    }
  }

  readInternalFile = () => {
    try {
      return JSON.parse(
        fs.readFileSync(`${this.path}/vault/internalData.json`).toString()
      );
    } catch (e) {
      return null;
    }
  };

  writeJSONToInternalFile = (content: Content) => {
    const { attrName, attrValue } = content;
    if (this.attrsWhiteList.includes(attrName)) {
      // Authorized attributes
      const readResult = this.readInternalFile();
      if (readResult === null) {
        return -1;
      }
      readResult[attrName] = attrValue;
      fs.writeFileSync(
        `${this.path}/vault/internalData.json`,
        JSON.stringify(readResult),
        'utf-8'
      );
      return 0;
    }
    return -1;
  };

  eraseData = () => {
    fs.writeFileSync(`${this.path}/vault/internalData.json`, '{}', 'utf-8');
  };
}

const dataFileIO = new DataFileIO();

export default dataFileIO;
