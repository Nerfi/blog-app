import React , {useState} from 'react';
import './auth.css';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import Spinner from '../../UI/Spinner/Spinner';
import firebase from '../../firebase/firebase';
import ModalAlert from '../../UI/Modal/Modal';


const Auth = (props) =>  {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: ''
  });

  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false);
  //adding state in order to let the modal know when to mount and unmount
  const [display, setDisplay] = useState(false);


    //validating the email and the password to be grather than 6.
  const  validateForm  = () => {

    const {email, password} = credentials;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return pattern.test(email) && password.length >= 6;
  }


const handleSubmit = async (event) => {

  event.preventDefault();

  const {email , password, name} = credentials;


   setDisplay(true)

   await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {

      setLoading(true);
     //creating a new user in the db
         firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
            email,
            name

          })

          history.push("/");

        setLoading( prev => prev); //aqui laoding es false

    })
    .catch(error => {
      setError(error.message);
    });

    setDisplay(false);

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

  const {email} = credentials;
  if(display) return  <ModalAlert email={email} />
  if(loading) return <Spinner/>

  return (
     <div className="Login">
        <form onSubmit={handleSubmit}>

        <h1>
          Sign Up
        </h1>
        <h2> {error} </h2>

          <FormGroup controlId="name" bssize="large">
          <Form.Label>Name</Form.Label>
            <FormControl
              value={credentials.name}
              name="name"
              onChange={handleChange}
              type="name"
            />
          </FormGroup>

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
