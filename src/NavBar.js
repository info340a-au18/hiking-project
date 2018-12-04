import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.scss';

import {
    NavbarBrand,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
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
                    <NavbarBrand href="/hiking-project">Hike Finder</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/hiking-project/Account">Account</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/hiking-project/SavedHikes">Saved</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


