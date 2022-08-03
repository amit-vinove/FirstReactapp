import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UseRefEx() {
    const emailInput = useRef(null);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const email = emailInput.current.value;
        console.log(email);
    }

  return (
    <div>
      <div className='col-md-6'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" id='email' ref={emailInput} placeholder="Enter email" />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </div>
    </div>
  );
}


export default UseRefEx;