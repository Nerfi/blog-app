import React , {useState, useContext} from 'react';
import './auth.css';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { Redirect} from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';
import {UserContext} from '../Context/AuthContext';
//importing firebase in order to add a user with email and password
import firebase from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';

const Auth = (props) =>  {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState("");

    const {newData, setNewData} = useContext(UserContext);

    //validating the email and the password to be grather than 6.
  const  validateForm  = () => {

    const {email, password} = credentials;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return pattern.test(email) && password.length >= 6;
  }


//new tresting handle submit
const handleSubmit = async (event) => {

  event.preventDefault();
  const {email , password} = credentials;

  //firebase method to sign up
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {
        if(result) {
            history.push("/");
            //delete line below after all is working
            alert('the user with the email' + email + 'was created!')
        } else {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        }
    }).catch(e => {
      setError(e.message)
    })

};

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

  if(newData.loading) {
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
