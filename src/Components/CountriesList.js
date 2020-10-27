import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import Country from "./Country.js";

export class CountriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingItem: 0,
      editingItemName: "",
      editingItemArea: "",
      editingProperty: "",
    };
  }

  editCountry = (country, property) => {
    if (property === "country") {
      this.setState({
        editingItem: country.countryId,
        editingItemName: country.countryName,
        editingProperty: property,
      });
    } else {
      this.setState({
        editingItem: country.countryId,
        editingItemArea: country.countryArea,
        editingProperty: property,
      });
    }
  };

  changeCountryName = (evt) => {
    this.setState({
      editingItemName: evt.target.value,
    });
  };

  editCountryName = (evt) => {
    evt.preventDefault();

    fetch(
      "http://contactmanager.business-specialist.tk/services/countryEdit.php",
      {
        method: "POST",
        body: JSON.stringify({
          country_id: this.state.editingItem,
          country_name: this.state.editingItemName,
          area_name: this.state.editingAreaName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  printElement = (country) => {
    // return <React.Fragment><Col xs="3">{country.countryName}</Col><Col xs="3">{country.countryArea}</Col></React.Fragment>
    let showEditingItem = null;

    if (
      this.state.editingProperty === "country" &&
      this.state.editingItem === country.countryId
    ) {
      showEditingItem = (
        // <React.Fragment> === <>
        <>
          <Col xs="3">
            <Form inline onSubmit={this.editCountryName}>
              <FormGroup>
                <Input
                  type="text"
                  onChange={this.changeCountryName}
                  value={this.state.editingItemName}
                  required
                />
                <Button type="submit">Salva modifiche</Button>
              </FormGroup>
            </Form>
          </Col>
          <Col xs="3" onClick={() => this.editCountry(country, "area")}>
            {country.countryArea}
          </Col>
        </>
      );
    }

    if (
      this.state.editingProperty === "area" &&
      this.state.editingItem === country.countryId
    ) {
      showEditingItem = (
        <>
          <Col xs="3" onClick={() => this.editCountry(country, "country")}>
            {country.countryName}
          </Col>
          <Col xs="3">
            <Form inline onSubmit={this.editCountryName}>
              <FormGroup>
                <Input
                  type="select"
                  onChange={(evt) => {
                    this.setState({ editingItemArea: evt.target.value });
                  }}
                  value={this.state.editingItemArea}
                  required
                >
                  <option value="Europa" selected>
                    Europe
                  </option>
                  <option value="Asia">Asia</option>
                  <option value="America">America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </Input>
                <Button type="submit">Salva modifiche</Button>
              </FormGroup>
            </Form>
          </Col>
        </>
      );
    }

    return this.state.editingItem !== country.countryId ? (
      <React.Fragment>
        <Col xs="3" onClick={() => this.editCountry(country, "country")}>
          {country.countryName}
        </Col>
        <Col xs="3" onClick={() => this.editCountry(country, "area")}>
          {country.countryArea}
        </Col>
      </React.Fragment>
    ) : (
      showEditingItem
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.countriesList.map((country, index) => {
          return (
            <Row key={index}>
              <Col xs="2">{country.countryId}</Col>
              {this.printElement(country)}
              <Col xs="4">
                <Button onClick={() => this.props.onDelete(country.countryId)}>
                  Elimina
                </Button>
              </Col>
            </Row>
          );
        })}
      </React.Fragment>
    );
  }
}

export default CountriesList;
