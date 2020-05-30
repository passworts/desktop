import crypto from 'crypto';
import dataFileIO from './DataFileIO';

type Content = {
  attrName: any;
  attrValue: any;
};

class Authentication {
  private secretKey: string;

  private verified: boolean;

  private internalData: object;

  private iv: string;

  constructor() {
    this.secretKey = '';
    this.verified = false;
    this.internalData = {};
    this.iv = '';
  }

  getInternalData = () => {
    return this.internalData;
  };

  setInternalData = (internalData: object) => {
    this.internalData = internalData;
  };

  getVerified = () => {
    return this.verified;
  };

  setVerified = (verified: boolean) => {
    this.verified = verified;
  };

  verifyCredential = (username: string, password: string) => {
    const {
      usernameHashed,
      usernameSalt,
      passwordHashed,
      passwordSalt,
      iv
    } = dataFileIO.readAuthData();
    try {
      if (
        this.hash(username + usernameSalt) === usernameHashed &&
        this.hash(password + passwordSalt) === passwordHashed
      ) {
        this.secretKey = this.hash(passwordSalt + password + username);
        this.iv = iv;
        this.setVerified(true);
        // Decrypt all data in internalData.json
        this.setInternalData(this.readRecordsData());
        return true;
      }
      return false;
    } catch (e) {
      // Unable to verify credential
      return false;
    }
  };

  hash = (hashingMessage: string) => {
    return crypto
      .createHash('sha256')
      .update(hashingMessage)
      .digest('hex');
  };

  decrypt = (encryptedMessage: string) => {
    const decipher = crypto.createDecipheriv(
      'aes-256-ctr',
      this.secretKey,
      this.iv
    );
    let dec = decipher.update(encryptedMessage, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  };

  encrypt = (plainMessage: string) => {
    const cipher = crypto.createCipheriv(
      'aes-256-ctr',
      this.secretKey,
      this.iv
    );
    let crypted = cipher.update(plainMessage, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  };

  createCredential = (username: string, password: string) => {
    dataFileIO.initializeData();
    // Saves username with salt
    const usernameSalt = `usernameSalt${new Date()}`;
    // Writes hashed username
    dataFileIO.writeAuthData({
      attrName: 'usernameHashed',
      attrValue: this.hash(username + usernameSalt)
    });
    // Writes username salt
    dataFileIO.writeAuthData({
      attrName: 'usernameSalt',
      attrValue: usernameSalt
    });

    // Creates password salt
    const passwordSalt = `passwordSalt${new Date()}`;
    // Writes hashed password
    dataFileIO.writeAuthData({
      attrName: 'passwordHashed',
      attrValue: this.hash(password + passwordSalt)
    });
    // Writes password salt
    dataFileIO.writeAuthData({
      attrName: 'passwordSalt',
      attrValue: passwordSalt
    });

    dataFileIO.writeAuthData({
      attrName: 'iv',
      attrValue: `${new Date()}.-iv`
    });
    return true;
  };

  writeRecordsData = (content: Content) => {
    const { attrName, attrValue } = content;
    dataFileIO.writeRecordsData({
      attrName,
      attrValue: this.encrypt(JSON.stringify(attrValue))
    });
  };

  initializeData = () => {
    dataFileIO.initializeData();
  };

  readRecordsData = () => {
    const encryptedRecordsData = dataFileIO.readRecordsData();
    if (encryptedRecordsData === '') {
      return [];
    }
    return JSON.parse(this.decrypt(encryptedRecordsData));
  };
}

const authentication = new Authentication();

export default authentication;
