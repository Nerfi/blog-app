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

  //storing user data comming from firebase

  const [userData, setUserData] = useState({
    token: null,
    userId: null,
    error: null,
    loading: false
  });

  const  validateForm  = () => {

    const {email, password} = credentials;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return pattern.test(email) && password.length > 0;
  }



  const handleSubmit = async (event) => {

    event.preventDefault();
   const {email , password} = credentials;
    //this is in max video the onAuth action dipatch from the redux store weere we send email adn password to firebase
    const authData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  email, password,  returnSecureToken: true })

  }
    const envVaribales = process.env.REACT_APP_SIGNUP_API_KEY;

    const postRequest =  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${envVaribales}`, authData)
    const response = await postRequest.json();
    console.log(response, 'reponse from firebase here')
    //setting up state in case there is an error
      return response.error ? setError(response.error.message) : setUserData({token: response.idToken});
}

console.log(userData.token,  'tokejn is here')

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
