import React, { useState } from 'react';
import {
  Avatar,
  Snackbar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  makeStyles,
  Box
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import routes from '../../constants/routes.json';
import Footer from '../Footer/Index';
import authentication from '../../utils/Authentication';
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
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(2, 0, 0)
    }
  }));
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={1000}
        open={showWarning}
        message={warning}
        onClose={() => setShowWarning(false)}
        key="1"
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {/* <form className={classes.form} noValidate> */}
        <TextField
          variant="outlined"
          onChange={event => setUsername(event.target.value)}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Username"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          onChange={event => setPassword(event.target.value)}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => dealWithCredential('signIn')}
        >
          Sign In
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => dealWithCredential('signUp')}
        >
          Sign Up
        </Button>
        {/* <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid> */}
        {/* </form> */}
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}
