import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import EditUserScreen from './screens/EditUserScreen';

const App = () => {
  return (
    <Router>
      <main className="py-3">
        <Container>
          <Route path="/users/:id" component={EditUserScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  );
};

export default App;
