import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.scss';
import { Link } from 'react-router-dom'

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
    DropdownItem
} from 'reactstrap';


export class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    //citatoin: reactstrap
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavLink to="/Home">Hike Finder</NavLink>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/Home">Home</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Account
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink to="/Account">Sign in</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink to="/SavedHikes">Saved</NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Sign out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


