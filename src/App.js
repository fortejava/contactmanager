import React from 'react';
import logo from './logo.svg';
import MainMenu from './Components/MainMenu'
import Agents from './Components/Agents'
import Brands from './Components/Brands'
import Home from './Components/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Importo il container bootstrap
import { Container, Row, Col } from 'reactstrap';
import Countries from './Components/Countries';

function App() {
  return (
    <Container>
      <Router>
        <Row>
          <Col>
            <MainMenu />
          </Col>
        </Row>
        <Row>
          <Col>
            <Switch>
                <Route path="/brands">
                  <Brands />
                </Route>
                <Route path="/agents">
                  <Agents />
                </Route>
                <Route path="/countries">
                  <Countries />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
            </Switch>
          </Col>
        </Row>
      </Router>
      
    </Container>
    
  );
}

export default App;
