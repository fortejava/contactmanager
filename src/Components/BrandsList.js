import React, { Component } from 'react'
import Brand from './Brand';
import { Container, Row, Col, Button, FormGroup, Input, Form } from 'reactstrap';

export class BrandsList extends Component {
    constructor(props) 
    {
        super(props)

        this.state = {
            editingItem : 0,
            editingItemName : ""
        }
    }

    editBrand = (brand) => 
    {
        this.setState({
            editingItem: brand.id,
            editingItemName : brand.name
        });
    }

    editBrandname = (evt) =>
    {
        evt.preventDefault();
        fetch('http://contactmanager.business-specialist.tk/services/editBrand.php',
        {
            method: "POST",
            body: JSON.stringify({brandId: this.state.editingItem, brandName: this.state.editingItemName}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then(response => {
              return response.json()
            })
          .then(data => {
            if (data.code == 1)
            {
               
               this.setState({errorCode : true, errorText : data.errors });
            }
            else
            {
                this.setState({editingItem : 0, editingItemName : ""})
                this.props.onBrandUpdate();
                
            }
        });
    }

    changeBrandName = (evt) =>
    {
        console.log(evt);
        this.setState({editingItemName: evt.target.value});
    }

    printElement = (brand) => 
    {
        
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
    }
    
    render() {
        console.log(this.props.brandList);
        return (
            <React.Fragment>
                {
                    this.props.brandList.map((brand, index) => { return <Row key={index}>
                                <Col xs="2">{brand.id}</Col>
                                {
                                    this.printElement(brand)
                                }    
                                <Col xs="4">
                                    <Button onClick={() => this.props.onDelete(brand.id)}>Elimina</Button>
                                </Col>
                        </Row>
                    })
                } 
            </React.Fragment>
        )
    }
}

export default BrandsList


