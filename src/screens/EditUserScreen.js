import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { Avatar } from '@material-ui/core';

const EditUserScreen = ({ match }) => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [updatedUser, setUpatedUser] = useState({});
  const [updateTrue, setUpdateTrue] = useState(false);

  useEffect(() => {
    setFirst_name('');
    setLast_name('');
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser(match.params.id, first_name, last_name);
  };

  const updateUser = async (id, first_name, last_name) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `https://reqres.in/api/users/${id}`,
      { first_name, last_name },
      config
    );
    setUpatedUser({ ...data });
    setUpdateTrue(true);
  };

  const deleteHandler = () => {
    setUpdateTrue(false);
    deleteUser(match.params.id);
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    setUpatedUser({});
  };

  return (
    <div>
      <Link to={'/'} className="btn btn-light">
        Go back
      </Link>
      <Card className="my-3 border-warning shadow p-3 mb-5 bg-white rounded">
        <Form className="p-3" onSubmit={submitHandler}>
          <h4>Update User</h4>
          <Form.Group controlId="first_name">
            <Form.Label className="text-info">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label className="text-success">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="btn btn-dark mx-5"
              type="submit"
            >
              Update User
            </Button>
          </div>
        </Form>
      </Card>
      {updateTrue && updatedUser && (
        <Card className="border-warning shadow p-3 mb-5 bg-white rounded ">
          <Card.Header className="text-info rounded d-flex align-items-center ">
            <Avatar className="mr-3 bg-info">
              {updatedUser.first_name && updatedUser.first_name[0]}
            </Avatar>
            {updatedUser.first_name}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <i className="fas fa-file-signature mr-3"></i>{' '}
              {updatedUser.last_name}
            </Card.Text>
            <Card.Text className="text-success">
              <i className="far fa-clock mr-3"></i> Updated At :{' '}
              {updatedUser.updatedAt && updatedUser.updatedAt.substr(0, 10)}
            </Card.Text>
          </Card.Body>
          <Button
            className="btn btn-light"
            variant="primary"
            onClick={deleteHandler}
          >
            Delete User
          </Button>
        </Card>
      )}
    </div>
  );
};

export default EditUserScreen;
