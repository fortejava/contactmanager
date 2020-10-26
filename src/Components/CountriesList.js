import React, { Component } from 'react'
import { Container, Row, Col, Button, FormGroup, Input, Form } from 'reactstrap';
import Country from "./Country.js"

export class CountriesList extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            editingItem : 0,
            editingItemName : ""
        }
    }

    printElement = (country) => 
    {

        return <React.Fragment><Col xs="3">{country.countryName}</Col><Col xs="3">{country.countryArea}</Col></React.Fragment>
       /* 
        return (
            this.state.editingItem != brand.id ? <Col xs="6" onClick={() => this.editBrand(brand)}>{brand.name}</Col>
                : <Col xs="6">
                    <Form inline onSubmit={this.editBrandname}>
                        <FormGroup>
                            <Input type="text" onChange={this.changeBrandName} value={this.state.editingItemName} required />
                            <Button type="submit">Salva modifiche</Button>
                        </FormGroup>
                    </Form>
                </Col>
        )
        */
    }


    render() {
        return (
            <React.Fragment>
                {
                    this.props.countriesList.map((country, index) => { return <Row key={index}>
                                <Col xs="2">{country.countryId}</Col>
                                {
                                    this.printElement(country)
                                }    
                                <Col xs="4">
                                    <Button onClick={() => this.props.onDelete(country.countryId)}>Elimina</Button>
                                </Col>
                        </Row>
                    })
                } 
            </React.Fragment>
        )
    }
}

export default CountriesList
