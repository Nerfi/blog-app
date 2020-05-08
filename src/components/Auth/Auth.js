import React , {useState} from 'react';
import './auth.css';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { Redirect} from 'react-router-dom';

const Auth = (props) =>  {


  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  //adding error state
  const [error, setError] = useState("");

  const  validateForm  = () => {

    const {email, password} = credentials;

    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
   const {email , password} = credentials;

    const authData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  email, password,  returnSecureToken: true })

  }
    const envVaribales = process.env.REACT_APP_SIGNUP_API_KEY;

    const postRequest =  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${envVaribales}`, authData)
    const response = await postRequest.json();
    //setting up state in case there is an error
      return response.error ? setError(response.error.message) : null;
}


  const handleChange = (event) => {

    let name = event.target.name;
    let value = event.target.value;

    setCredentials(prevCredentials => {
      return {
        ...prevCredentials,
        [name]: value
      };
    });


  }

  const history =  props.history;


  return (
     <div className="Login">
        <form onSubmit={handleSubmit}>
        <h1> {error ?  error : "SignUp"}</h1>
          <FormGroup controlId="email" bssize="large">
           <Form.Label>Email</Form.Label>
            <FormControl
              autoFocus
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
          <Form.Label>Password</Form.Label>
            <FormControl
              value={credentials.password}
              name="password"
              onChange={handleChange}
              type="password"
            />
          </FormGroup>
          <Button block bssize="large" disabled={!validateForm()} type="submit">
            Sign Up
          </Button>
            <Button block bssize="large" onClick={() => history.push('/Login')} type="submit">
            Login
          </Button>
        </form>
    </div>

  );

};

export default Auth;