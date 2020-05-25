import React, { useState } from 'react';
import { Button, TextField, Snackbar } from '@material-ui/core';
import authentication from '../../utils/Authentication';
import routes from '../../constants/routes.json';
import styles from './Home.css';
import { history } from '../../store/configureStore';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [warning, setWarning] = useState('');

  const dealWithCredential = (flag: string) => {
    if (username === '' || password === '') {
      setWarning('Empty username or password');
      setShowWarning(true);
      return;
    }
    if (username !== '' && password !== '') {
      if (flag === 'signIn') {
        const result = authentication.verifyCredential(username, password);
        if (result) {
          history.push(routes.PASSWORT);
        } else {
          setWarning('Wrong username or password');
          setShowWarning(true);
        }
      } else if (flag === 'signUp') {
        const result = authentication.createCredential(username, password);
        if (result) {
          history.push(routes.PASSWORT);
        }
      }
    }
  };

  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={1000}
        open={showWarning}
        message={warning}
        onClose={() => setShowWarning(false)}
        key="1"
      />
      <TextField
        label="Username"
        onChange={event => setUsername(event.target.value)}
      />
      <TextField
        label="Password"
        onChange={event => setPassword(event.target.value)}
      />
      <Button
        color="primary"
        variant="outlined"
        onClick={() => dealWithCredential('signIn')}
      >
        Sign In
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => dealWithCredential('signUp')}
      >
        Sign Up
      </Button>
    </div>
  );
}
