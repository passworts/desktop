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
}

const authentication = new Authentication();

export default authentication;
