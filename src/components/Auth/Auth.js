import React , {useState} from 'react';
import './auth.css';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";

const Auth = () =>  {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const  validateForm  = () => {

    const {email, password} = credentials;

    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
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

  const handleSwitch = () => {
    return alert('working')
  }

  return (
     <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
           <Form.Label>Email</Form.Label>
            <FormControl
              autoFocus
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
            <FormControl
              value={credentials.password}
              name="password"
              onChange={handleChange}
              type="password"
            />
          </FormGroup>
          <Button block bssize="large" disabled={!validateForm()} type="submit">
            Login
          </Button>
            <Button block bssize="large" onClick={handleSwitch} type="submit">
            Sign Up
          </Button>
        </form>
    </div>

  );

};

export default Auth;
