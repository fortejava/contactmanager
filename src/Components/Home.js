import React, { Component } from 'react'
import MainSlider from './MainSlider'
import LoginForm from './LoginForm'

import { Container, Row, Col } from 'reactstrap';

export class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <MainSlider />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LoginForm />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Home