import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import authentication from '../../utils/Authentication';
import dataFileIO from '../../utils/DataFileIO';
import styles from './Home.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signInClicked = () => {
    authentication.verifyCredential(username, password);
    // Redirect to data page
    // console.log(result);
  };

  const signUpClicked = () => {
    // Must remove all data and recreate file;
    dataFileIO.eraseData();
    // Saves username with salt
    const usernameSalt = `usernameSalt${new Date()}`;
    // Writes hashed username
    dataFileIO.writeJSONToInternalFile({
      attrName: 'usernameHashed',
      attrValue: authentication.hash(username + usernameSalt)
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
      attrValue: authentication.hash(password + passwordSalt)
    });
    // Writes password salt
    dataFileIO.writeJSONToInternalFile({
      attrName: 'passwordSalt',
      attrValue: passwordSalt
    });
  };
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <TextField
        label="Username"
        onChange={event => setUsername(event.target.value)}
      />
      <TextField
        label="Password"
        onChange={event => setPassword(event.target.value)}
      />
      <Button color="primary" variant="outlined" onClick={signInClicked}>
        Sign In
      </Button>
      <Button color="primary" variant="outlined" onClick={signUpClicked}>
        Sign Up
      </Button>
    </div>
  );
}
