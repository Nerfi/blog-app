import React , {useState, useContext} from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import {UserContext} from '../Context/AuthContext';
//THIS IS THE SIGN  IN COMPONENT


const SingUp = (props) => {

  const [singUp, setSignup] =  useState({email: '', password: ''});
  const [error, setError] = useState(null);
  //useContext is here
  const {newData, setNewData} = useContext(UserContext);


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
    response.error ? setError(response.error.message) : setNewData({token: response.idToken, userId: response.localId})

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
        {error && error}
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
