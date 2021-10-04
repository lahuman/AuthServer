import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import Copyright from '../Main/Copyright';

export default function SignIn() {
  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const refName = React.useRef();
  const refPass = React.useRef();

  const handleSumbitForm = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("It's need username!");
      refName.current.focus();
      return false;
    }
    if (pass.trim() === "") {
      alert("It's need password!");
      refPass.current.focus();
      return false;
    }
    const { data } = await axios.post(`${process.env.REACT_APP_API_HOST}/login`, { user_id: name, password: pass });
    if (data.status === 'success') {
      window.localStorage.setItem('token', data.token);
      window.location.href = '/';
    } else {
      alert('Wrong username or password!');
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSumbitForm} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="User id"
            name="email"
            autoComplete="email"
            autoFocus
            ref={refName} value={name} onChange={e => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            ref={refPass} value={pass} onChange={e => setPass(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
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
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>

  );
}

