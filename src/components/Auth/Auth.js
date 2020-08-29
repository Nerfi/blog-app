import React , {useState} from 'react';
import './auth.css';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import Spinner from '../../UI/Spinner/Spinner';
//importing firebase in order to add a user with email and password
import firebase from '../../firebase/firebase';
import Modal from '../../UI/Modal/Modal';


const Auth = (props) =>  {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: ''
  });

  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);
  //adding state in order to display the Modal, not working
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
  //setting the loading state
  setLoading(prev => !prev);

  //firebase method to sign up
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {

        if(result) {

         //once the user is created we also create a new one in the DB
          firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
            email,
            name

          }).catch(e => {

           console.log('Something went wrong with added user to firestore: ', error);

          })
            // code to display once the user was created correctly
            //AQUI ABAJO VA MI CODIGO PARA CUADNO LA REQU FUCNIONOOOO

              setDisplay(true)
              history.push("/");
        } else {

        const errorMessage = error.message;
        setError(errorMessage);

        }
        setLoading( prev => prev);
        setDisplay(false);

    }).catch(e => {
      setError(e.message);
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

//display spinner onLoading user
  if(loading)  return <Spinner/>


  return (
     <div className="Login">
        <form onSubmit={handleSubmit}>
        <h1> {error ?  error : "SignUp"}</h1>

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
          <Modal/>

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
