import CryptoJS from 'crypto-js';
import dataFileIO from './DataFileIO';

class Authentication {
  private secretKey: string;

  constructor() {
    this.secretKey = '';
  }

  verifyCredential = (username: string, password: string) => {
    const {
      usernameHashed,
      usernameSalt,
      passwordHashed,
      passwordSalt
    } = dataFileIO.readInternalFile();
    try {
      if (
        this.hash(username + usernameSalt) === usernameHashed &&
        this.hash(password + passwordSalt) === passwordHashed
      ) {
        this.secretKey = this.hash(passwordSalt + password + username);
        return true;
      }
      return false;
    } catch (e) {
      // Unable to verify credential
      return false;
    }
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
    // Must remove all data and recreate file;
    dataFileIO.eraseData();
    // Saves username with salt
    const usernameSalt = `usernameSalt${new Date()}`;
    // Writes hashed username
    dataFileIO.writeJSONToInternalFile({
      attrName: 'usernameHashed',
      attrValue: this.hash(username + usernameSalt)
    });
    // Writes username salt
    dataFileIO.writeJSONToInternalFile({
      attrName: 'usernameSalt',
      attrValue: usernameSalt
    });

    // Creates password salt
    const passwordSalt = `passwordSalt${new Date()}`;
    // Writes hashed password
    dataFileIO.writeJSONToInternalFile({
      attrName: 'passwordHashed',
      attrValue: this.hash(password + passwordSalt)
    });
    // Writes password salt
    dataFileIO.writeJSONToInternalFile({
      attrName: 'passwordSalt',
      attrValue: passwordSalt
    });
    return true;
  };
}

const authentication = new Authentication();

export default authentication;
