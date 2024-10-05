import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const FormField = ({ label, name, type, value, onChange }) => (
  <Form.Group className='mb-3'>
    <Form.Label htmlFor={name}>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={`Your ${name}`}
      name={name}
      onChange={onChange}
      value={value}
      required
    />
    <Form.Control.Feedback type="invalid">
      {label} is required!
    </Form.Control.Feedback>
  </Form.Group>
);

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    setShowAlert(!!error);
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({ username: '', email: '', password: '' });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
        Something went wrong with your signup!
      </Alert>

      <FormField label="Username" name="username" type="text" value={userFormData.username} onChange={handleInputChange} />
      <FormField label="Email" name="email" type="email" value={userFormData.email} onChange={handleInputChange} />
      <FormField label="Password" name="password" type="password" value={userFormData.password} onChange={handleInputChange} />

      <Button
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type="submit"
        variant="success"
      >
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
