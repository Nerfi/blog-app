import React,{useState} from  'react';
import Modal from 'react-bootstrap/Modal';
//need to take the user emial in order to display a btter UI experience on sign up
  function ModalAlert () {

    const [show, setShow] = useState(true);

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
