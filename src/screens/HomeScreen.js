import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import User from '../components/User';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [newUser, setNewUser] = useState({});
  const [userTrue, setUserTrue] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('https://reqres.in/api/users?page=2');
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [users, newUser]);
  const submitHandler = (e) => {
    e.preventDefault();
    createUser(name, job);
    setUserTrue(true);
  };

  const createUser = async (name, job) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const createdUser = await axios.post(
        `https://reqres.in/api/users`,
        { name, job },
        config
      );
      setNewUser({ ...createdUser.data });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="my-3 shadow-lg p-3 mb-5 bg-white rounded">
      <div className="mx-auto border-bottom border-primary py-3 d-flex justify-content-center ">
        <h1>User's List</h1>
      </div>
      <Row>
        <Col md={8}>
          <Row>
            {users.map((user) => (
              <Col key={user.id} md={6}>
                <User user={user} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4} className="my-3">
          <Card className="border-warning shadow p-3 mb-5 bg-white rounded ">
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="fname">
                <Form.Label className="text-info">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="lname">
                <Form.Label className="text-success">Job</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" className="btn btn-block" type="submit">
                Create User
              </Button>
            </Form>
          </Card>
          <div className="d-flex justify-content-between mb-3">
            <Link
              to={`/users/2`}
              variant="primary"
              className="btn btn-block btn-dark"
            >
              To Update and Delete User Click Here ...
            </Link>
          </div>
          {userTrue && newUser && (
            <Card className="border-warning shadow p-3 mb-5 bg-white rounded ">
              <Card.Header className="text-info rounded d-flex align-items-center ">
                <Avatar className="mr-3 bg-info">
                  {newUser.name && newUser.name[0]}
                </Avatar>
                {newUser.name}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <i className="fas fa-briefcase mr-3"></i> {newUser.job}
                </Card.Text>
                <Card.Text className="text-success">
                  <i className="far fa-clock mr-3"></i> Created At :{' '}
                  {newUser.createdAt && newUser.createdAt.substr(0, 10)}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
