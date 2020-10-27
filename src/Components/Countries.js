import React, { Component } from "react";
import ErrorModal from "./ErrorModal";
import CountryFormData from "./CountryFormData";
import Country from "./Country";
import CountriesList from "./CountriesList";

import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export class Countries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //brandErrors : new BrandErrors(),
      countryFormData: new CountryFormData(),
      errorCode: false,
      errorText: "",
      reloadList: true,
      countriesData: Array(),
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(
      "http://contactmanager.business-specialist.tk/services/getCountries.php"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const countriesDataList = data.map((item) => {
          return new Country(item.id, item.name, item.area);
        });

        this.setState({ countriesData: countriesDataList });
      });
  };

  createCountry = (evt) => {
    evt.preventDefault();

    //console.log(JSON.stringify(this.state.countryFormData));
    fetch(
      "http://contactmanager.business-specialist.tk/services/countryAdd.php",
      {
        method: "POST",
        body: JSON.stringify(this.state.countryFormData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      //Uso due then: con la prima converto la promise in un oggetto json, che lavoro all'interno della seconda
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 1) {
          this.setState({ errorCode: true, errorText: data.errors });
        } else {
          this.getData();
        }
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  countryNameChange = (evt) => {
    //Creo una copia dell'oggetto countryFormData
    let nextCountryFormData = JSON.parse(
      JSON.stringify(this.state.countryFormData)
    );
    nextCountryFormData.countryName = evt.target.value;

    this.setState({
      countryFormData: nextCountryFormData,
    });
  };

  countryAreaChange = (evt) => {
    let nextCountryFormData = JSON.parse(
      JSON.stringify(this.state.countryFormData)
    );
    nextCountryFormData.countryArea = evt.target.value;

    this.setState({
      countryFormData: nextCountryFormData,
    });
  };

  deleteCountry = (index) => {
    //TODO: Creare funzione che cancella una nazione dal db
    fetch(
      "http://contactmanager.business-specialist.tk/services/deleteBrands.php",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ country_id: index }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    const errorText = this.state.errorText;
    const reloadList = this.state.reloadList;

    return (
      <React.Fragment>
        <Container>
          <Form onSubmit={this.createCountry}>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="countryName">Country name</Label>
                  <input
                    type="text"
                    name="countryName"
                    id="countryName"
                    placeholder="Insert Country Name"
                    value={this.state.countryFormData.countryName}
                    onChange={this.countryNameChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <label for="countryArea">Country Area</label>
                  <Input
                    type="select"
                    name="countryArea"
                    id="countryArea"
                    onChange={this.countryAreaChange}
                  >
                    <option value="Europa" selected>
                      Europe
                    </option>
                    <option value="Asia">Asia</option>
                    <option value="America">America</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6">
                <Button type="submit">Add Country</Button>
              </Col>
            </Row>
          </Form>
          {this.state.errorCode && (
            <ErrorModal onPopupClose={this.eraseErrors} errorText={errorText} />
          )}
        </Container>

        <CountriesList
          countriesList={this.state.countriesData}
          onDelete={this.deleteCountry}
          onCountryUpdate={this.getData}
        />
      </React.Fragment>
    );
  }
}

export default Countries;
