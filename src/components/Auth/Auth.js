import React , {useState} from 'react';
import './auth.css';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { Redirect} from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';

const Auth = (props) =>  {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    token: null,
    userId: null,
    error: null,
    loading: false
  });

  // lesson 330 crea una function para hacer log out, en la cual
  //limpia el estado que he definido antes with userData
  console.log(userData, 'userdata is ehre') //this is wokring and Im storing the userData here

  const  validateForm  = () => {

    const {email, password} = credentials;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return pattern.test(email) && password.length >= 6;
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
   const {email , password} = credentials;

    //cahnginf thr default value from the state from loadinf: false to true, not suer if this is the best way
    setUserData(prevLoading => {return {loading: !prevLoading.loading}});

    const authData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  email, password,  returnSecureToken: true })

  }

    const envVaribales = process.env.REACT_APP_SIGNUP_API_KEY;

    const postRequest =  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${envVaribales}`, authData)
    const response = await postRequest.json();
    return response.error ? setError(response.error.message) : setUserData({token: response.idToken, userId: response.localId, loading: false});
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

  if(userData.loading) {
    return <Spinner/>
  }


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
