import React from 'react';
import './Login.css';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import styled from '@emotion/styled';

const CustomTextField = styled.input`
width: 100%;   
margin: 8px 0;  
padding: 12px 20px;   
display: inline-block;   
border: 2px solid black;   
box-sizing: border-box;   
`;

function Login() {
  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const refName = React.useRef();
  const refPass = React.useRef();
  const refForm = React.useRef();


  const handleResetForm = () => {
    setName('');
    setPass('');
    refName.current.focus();
  }

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
    if(data.status === 'success'){
      window.localStorage.setItem('token', data.token);
      window.location.href='/';
    }else {
      alert('Wrong username or password!' );
    }
  }

  return (
    <div >
      <center> <h1> Login Form </h1> </center>
      <form onSubmit={e => e.preventDefault()} ref={refForm}>
        <div className="container">
          <label>Username : </label>
          <CustomTextField variant="standard" type="text" ref={refName} value={name} onChange={e => setName(e.target.value)} placeholder="Enter Username" name="username" required />
          <label>Password: </label>
          <CustomTextField variant="standard" type="password" ref={refPass} value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter Password" name="password" required />
          <Button className="loginBtn" type="submit" variant="contained" onClick={handleSumbitForm}>Login</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
