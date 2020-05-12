import React , {useState, useContext} from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import {UserContext} from '../Context/AuthContext';
//THIS IS THE SIGN  IN COMPONENT

const SingUp = (props) => {

  const [singUp, setSignup] =  useState({email: '', password: ''});
  //useContext is here


  const handleSubmit = async (event) => {
    event.preventDefault();
   const {email , password} = singUp;

    const authData = {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  email, password,  returnSecureToken: true })

  }
    const envVaribales =  process.env.REACT_APP_SIGNIN_API_KEY;
    const postRequest =  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${envVaribales}`, authData);
    const response = await postRequest.json();
    console.log(response, 'reponse is here')

  }

  const handleChange = (event) => {

    let name = event.target.name;
    let value = event.target.value;

    setSignup(prevCredentials => {
      return {
        ...prevCredentials,
        [name]: value
      };
    });

  }

  const validateForm = () => {
     const {email, password} = singUp;

    return email.length > 0 && password.length > 0;
  }


  return (
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <FormGroup controlId="email" bssize="large">
           <Form.Label>Email</Form.Label>
            <FormControl
              autoFocus
              type="email"
              name="email"
              value={SingUp.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
          <Form.Label>Password</Form.Label>
            <FormControl
              value={SingUp.password}
              name="password"
              onChange={handleChange}
              type="password"
            />
          </FormGroup>
            <Button block bssize="large"  disabled={!validateForm()}  type="submit">
            Login
          </Button>
        </form>
    </div>
  );
} ;

export default SingUp;
