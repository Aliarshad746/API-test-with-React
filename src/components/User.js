import React from 'react';
import { Card } from 'react-bootstrap';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
const User = ({ user }) => {
  return (
    <Card className="my-3 border-warning shadow-lg p-3 mb-5 bg-white rounded">
      <Card.Header className="text-info rounded d-flex align-items-center ">
        <Avatar className="mr-3 bg-info">{user.first_name[0]}</Avatar>
        {` `}
        {user.first_name}
        {` `}
        {user.last_name}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <i className="fas fa-user mr-3"></i>
          {` `}
          {user.first_name}
        </Card.Title>
        <Card.Text className="text-success">
          <i className="fas fa-envelope mr-3"></i>
          {` `}
          {user.email}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default User;
