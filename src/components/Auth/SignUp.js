import React , {useState, useContext} from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import {UserContext} from '../Context/AuthContext';

//setting up firebase new metjhods fro internet
import firebase from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';
//THIS IS THE SIGN  IN COMPONENT


const SingUp = (props) => {

  const [singUp, setSignup] =  useState({email: '', password: ''});
  const [error, setError] = useState(null);

  const history = useHistory();

  //new handle submit with firebase methods
  const handleSubmit = async (event) => {
    //preventing default behavior
    event.preventDefault();
    const {email , password} = singUp;

     await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        if(response) {
          history.push("/UpdatePost")
          alert('the user' + email + 'was successfully signned in!')
        }
      }).catch(e => {
        setError(e.message);
      })

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
