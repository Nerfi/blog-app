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
           <Modal.Body>  {email && email ? "Welcome  " + email : "You sign out successfully!!" }</Modal.Body>
        <Modal.Footer>

        <Button variant="secondary" onClick={changeState}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

    )


  };


  export default ModalAlert;
