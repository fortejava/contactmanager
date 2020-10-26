import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

  import { NavLink as RRNavLink } from 'react-router-dom';

  import appLogo from "../assets/img/abc-web_logo.png";

export class MainMenu extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {isOpen: false}
    }

    toggle = () => {
        this.setState(
            {
                isOpen : !this.state.isOpen
            }
        );
    }

    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="#">
                    <NavLink tag={RRNavLink} exact to="/">
                        <img src={appLogo} alt="Logo" title="Logo" />
                    </NavLink>
                
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    
                    <NavItem>
                    <NavLink tag={RRNavLink} to="/agents/">Agents</NavLink>
                    </NavItem>
                    
                    <NavItem>
                    <NavLink tag={RRNavLink} to="/countries/">Countries</NavLink>
                    </NavItem>

                    <NavItem>
                    <NavLink tag={RRNavLink} to="/brands/">Brands</NavLink>
                    </NavItem>
                   
                </Nav>
                
                </Collapse>
        </Navbar>
        )
    }
}

export default MainMenu
