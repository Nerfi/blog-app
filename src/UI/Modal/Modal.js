import React,{useState, useContext} from  'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {AuthContext } from '../../../src/components/Context/AuthContext';

  function ModalAlert ({email, changeState}) {

    const [show, setShow] = useState(true);

    return (

      <Modal show={show}  animation={true}>
        <Modal.Header >
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
      {/* borrar la line de abajo en cuanto tenga todo correcto*/}
        <Modal.Body> You sign in successfully as {email}!!</Modal.Body>
           <Modal.Body>  {email ? "welcome to the app" : "You sign out successfully as " + {email}}</Modal.Body>
        <Modal.Footer>

        <Button variant="secondary" onClick={changeState}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

    )


  };


  export default ModalAlert;
