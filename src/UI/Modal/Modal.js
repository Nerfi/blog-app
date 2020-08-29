import React,{useState, useContext} from  'react';
import Modal from 'react-bootstrap/Modal';
import {AuthContext } from '../../../src/components/Context/AuthContext';

//need to take the user emial in order to display a btter UI experience on sign up
  function ModalAlert () {

    const [show, setShow] = useState(true);




    const { currentUser } = useContext(AuthContext);
    console.log(currentUser, 'currentUser Modal here')



    return (

      <Modal show={show}  animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body> You sign in successfully!!</Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>

    )


  };


  export default ModalAlert;
