import React, { Component } from 'react'
import BrandErrors from './BrandErrors';
import BrandFormData from './BrandFormData';
import ErrorModal from './ErrorModal';
import BrandsList from './BrandsList';
import Brand from './Brand';


import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class Brands extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            brandErrors : new BrandErrors(),
            brandFormData: new BrandFormData(),
            errorCode: false,
            errorText: "",
            reloadList : true,
            brandData : Array()

        }

    
    }

    getData = () => {
        fetch('http://contactmanager.business-specialist.tk/services/getBrands.php')
          .then(response => {
              return response.json()
            })
          .then(data => {
              const brandDataList = data.map((item) => 
              {
                  
                  return new Brand(item.companies_id, item.name);
              });
              //console.log(brandData);
              this.setState({ brandData:brandDataList })
            });
    }

    componentWillMount() 
    {
        this.getData();
         
    }

    deleteBrand = (brandId) =>
    {
        //TODO:
        //alert(brandId);

        fetch('http://contactmanager.business-specialist.tk/services/deleteBrand.php',
        {
            method: "POST",
            body: JSON.stringify({brand_id: brandId}),
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
                this.getData();
            }
        });
    }
    

    createBrand = (evt) => 
    {
        evt.preventDefault();
        
        
        fetch("http://contactmanager.business-specialist.tk/services/addBrand.php",
        {
            method: "POST",
            body: JSON.stringify(this.state.brandFormData),
            headers: {
                'Content-Type': 'application/json'
                
            }
        })
        //Uso due then: con la prima converto la promise in un oggetto json, che lavoro all'interno della seconda
        .then(response => response.json())
        .then(data => {
            if (data.code == 1)
            {
               
               this.setState({errorCode : true, errorText : data.errors });
            }
            else
            {
                this.getData();
            }
        })
        .catch(error => {
            console.log(
              "There has been a problem with your fetch operation:",
              error
            );
          });
        
    }

    brandNameChange = (evt) =>
    {
        //Creo una copia dell'oggetto BrandFormData
        let nextBrandFormData = JSON.parse(JSON.stringify(this.state.brandFormData));
        nextBrandFormData.brandName = evt.target.value;
        //this.state.brandFormData.setBrandName(evt.target.value);
        this.setState({
            brandFormData: nextBrandFormData
        });
    }

    eraseErrors = () =>
    {
        this.setState(
            {
                errorCode : false,
                errorText : ""
            }
        );
    }

    createErrorMessage = () =>
    {
        let retvalue = this.state.errorText.map(function (element)
        {
            return (<p>{element}</p>);
        });
        
    }
    
    render() {
        const errorText = this.state.errorText;
        const reloadList = this.state.reloadList;

        console.log(reloadList);
       
        return (
            
            <React.Fragment>
                <Container>
                    <Form onSubmit={this.createBrand}>
                        <Row>
                            <Col xs="12" sm="6">
                                <FormGroup>
                                    <Label for="brandName">Brand name</Label>
                                        <input 
                                            type="text" 
                                            name="brandName" 
                                            id="brandName" 
                                            placeholder="Insert Brand Name" 
                                            value={this.state.brandFormData.brandName} 
                                            onChange={this.brandNameChange} 
                                            required />
                                </FormGroup>
                                    
                            </Col>
                            <Col xs="12" sm="6">
                                <Button type="submit">Add Brand</Button>
                            </Col>
                        </Row>
                    </Form>
                    {
                       
                        this.state.errorCode && <ErrorModal onPopupClose={this.eraseErrors} errorText={errorText} /> 
                    }
                </Container>
                
                <BrandsList brandList={this.state.brandData} onDelete={this.deleteBrand} onBrandUpdate={this.getData} />
                
                
            </React.Fragment>
        )
    }
}

export default Brands
