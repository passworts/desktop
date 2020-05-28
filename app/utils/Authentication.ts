import dataFileIO from './DataFileIO';

const CryptoJS = require('crypto-js');

class Authentication {
  private secretKey: string;

  private verified: boolean;

  private internalData: object;

  constructor() {
    this.secretKey = '';
    this.verified = false;
    this.internalData = {};
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
      auth: { usernameHashed, usernameSalt, passwordHashed, passwordSalt }
    } = dataFileIO.readInternalFile();
    try {
      if (
        this.hash(username + usernameSalt) === usernameHashed &&
        this.hash(password + passwordSalt) === passwordHashed
      ) {
        this.secretKey = this.hash(passwordSalt + password + username);
        this.setVerified(true);
        // Decrypt all data in internalData.json
        this.setInternalData(this.decryptData());
        return true;
      }
      return false;
    } catch (e) {
      // Unable to verify credential
      return false;
    }
  };

  decryptData = () => {
    if (this.getVerified()) {
      const result = dataFileIO.readInternalFile();
      if (result) {
        // const {
        //   data: {
        //     dataType,
        //     dataMap
        //   }
        // } = result;
        const { records } = result;
        return records;
      }
      // Error
      return null;
    }
    return null;
  };

  hash = (hashingMessage: string) => {
    return CryptoJS.SHA256(hashingMessage).toString();
  };

  decrypt = (encryptedMessage: string) => {
    try {
      return CryptoJS.AES.decrypt(encryptedMessage, this.secretKey).toString(
        CryptoJS.enc.Utf8
      );
    } catch (e) {
      return 'Message unable to be decrypted';
    }
  };

  encrypt = (plainMessage: string) => {
    try {
      return CryptoJS.AES.encrypt(plainMessage, this.secretKey).toString();
    } catch (e) {
      return 'Unable to encrypt message';
    }
  };

  createCredential = (username: string, password: string) => {
    dataFileIO.initializeData();
    // Saves username with salt
    const usernameSalt = `usernameSalt${new Date()}`;
    // Writes hashed username
    dataFileIO.writeJSONToInternalFile({
      label: 'auth',
      attrName: 'usernameHashed',
      attrValue: this.hash(username + usernameSalt)
    });
    // Writes username salt
    dataFileIO.writeJSONToInternalFile({
      label: 'auth',
      attrName: 'usernameSalt',
      attrValue: usernameSalt
    });

    // Creates password salt
    const passwordSalt = `passwordSalt${new Date()}`;
    // Writes hashed password
    dataFileIO.writeJSONToInternalFile({
      label: 'auth',
      attrName: 'passwordHashed',
      attrValue: this.hash(password + passwordSalt)
    });
    // Writes password salt
    dataFileIO.writeJSONToInternalFile({
      label: 'auth',
      attrName: 'passwordSalt',
      attrValue: passwordSalt
    });
    return true;
  };
}

const authentication = new Authentication();

export default authentication;
