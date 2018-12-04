import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.scss';
import { Link } from 'react-router-dom'

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
                    <Link to="/">Hike Finder</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/Account">Account</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/SavedHikes">Saved</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


