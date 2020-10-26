import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row, Col } from 'reactstrap';

export class LoginForm extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    checkData = (e) =>
    {
        //TODO: tentare la login
        e.preventDefault();
    }
    
    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.checkData}>
                    <Row>
                        <Col xs="12" md="6">
                            <FormGroup className="mb-2 mr-sm mb-sm-0">
                                <Label for="username" className="mr-sm-2">Email</Label>
                                <Input type="text" name="username" id="username" placeholder="nomeutente" />
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="6">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="password" className="mr-sm-2">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="*********" />
                        </FormGroup>
                        </Col>
                        <Col xs="12" md="2">
                            <Button>Accedi</Button>
                        </Col>
                    </Row>

                </Form>
            </React.Fragment>
                
            
        )
    }
}

export default LoginForm
