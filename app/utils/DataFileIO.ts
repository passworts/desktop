import fs from 'fs';

type Content = {
  attrName: any;
  attrValue: any;
};

class DataFileIO {
  private path: string;

  private internalDataPath: string;

  private attrsWhiteList = [
    'usernameHashed',
    'passwordHashed',
    'usernameSalt',
    'passwordSalt',
    'history',
    'iv'
  ];

  constructor() {
    this.path = `${process.env.USERDATA_PATH}`;
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(`${this.path}`);
    }
    this.internalDataPath = `${process.env.USERDATA_PATH}/internalData.json`;
  }

  readAuthData = () => {
    try {
      const { auth } = JSON.parse(
        fs.readFileSync(this.internalDataPath).toString()
      );
      return auth;
    } catch (e) {
      return null;
    }
  };

  readCompleteData = () => {
    try {
      return JSON.parse(fs.readFileSync(this.internalDataPath).toString());
    } catch (e) {
      return null;
    }
  };

  readRecordsData = () => {
    try {
      const { records } = JSON.parse(
        fs.readFileSync(this.internalDataPath).toString()
      );
      return records;
    } catch (e) {
      return null;
    }
  };

  writeRecordsData = (content: Content) => {
    const { attrValue } = content;
    const completeData = this.readCompleteData();
    completeData.records = attrValue;
    fs.writeFileSync(
      this.internalDataPath,
      JSON.stringify(completeData),
      'utf-8'
    );
    return 0;
  };

  writeAuthData = (content: Content) => {
    const { attrName, attrValue } = content;
    if (this.attrsWhiteList.includes(attrName)) {
      // Authorized attributes
      const completeData = this.readCompleteData();
      completeData.auth[attrName] = attrValue;
      fs.writeFileSync(
        this.internalDataPath,
        JSON.stringify(completeData),
        'utf-8'
      );
      return 0;
    }

    return -1;
  };

  initializeData = () => {
    // Must remove all data and recreate file;
    fs.writeFileSync(
      this.internalDataPath,
      '{"auth":{},"records":""}',
      'utf-8'
    );
  };
}

const dataFileIO = new DataFileIO();

export default dataFileIO;
