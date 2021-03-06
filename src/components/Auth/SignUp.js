import React , {useState} from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import firebase from '../../firebase/firebase';
import ModalAlert from '../../UI/Modal/Modal';

//THIS IS THE SIGN  IN COMPONENT
const SingUp = (props) => {

  const [singUp, setSignup] =  useState({email: '', password: ''});
  const [error, setError] = useState(false);
  //adding state in order to display the modal
  const [display, setDisplay] = useState(false);

  const history = props.history;

  const handleSubmit = async (event) => {

    event.preventDefault();

    const {email , password} = singUp;


     setDisplay(true);

     await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {

          history.push("/")


      })
      .catch(e => {
        setError(e.message);
      })

      setDisplay(false)

  };

  const handleChange = (event) => {

    let name = event.target.name;
    let value = event.target.value;

    setSignup(prevCredentials => {
      return {
        ...prevCredentials,
        [name]: value
      };
    });

  };

  const validateForm = () => {
     const {email, password} = singUp;

    return email.length > 0 && password.length > 0;
  };

  //displaying modal
  if(display) return <ModalAlert/>

  return (
      <div className="Login">
        <form onSubmit={handleSubmit}>
         <h2>{error}</h2>
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
