import fs from 'fs';

type Content = {
  attrName: string;
  attrValue: string;
};

class DataFileIO {
  private path: string;

  private internalDataPath: string;

  private attrsWhiteList = [
    'usernameHashed',
    'passwordHashed',
    'usernameSalt',
    'passwordSalt',
    'history'
  ];

  constructor() {
    this.path = `${process.env.USERDATA_PATH}`;
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(`${this.path}`);
    }
    this.internalDataPath = `${process.env.USERDATA_PATH}/internalData.json`;
  }

  readInternalFile = () => {
    try {
      return JSON.parse(fs.readFileSync(this.internalDataPath).toString());
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
        this.internalDataPath,
        JSON.stringify(readResult),
        'utf-8'
      );
      return 0;
    }
    return -1;
  };

  eraseData = () => {
    fs.writeFileSync(this.internalDataPath, '{}', 'utf-8');
  };
}

const dataFileIO = new DataFileIO();

export default dataFileIO;
