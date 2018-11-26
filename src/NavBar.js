import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.scss';
import logo from './img/Hamburger.svg';


export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    menu = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <nav>
                <Menu open={this.state.isOpen} menu={this.menu}/>
                <div>
                    {/*<img id="hamburger-menu" onClick={this.menu} src={logo} alt="icon" />*/}
                    <h1>Hike Finder </h1>
                </div>
            </nav>
        );
    }
}

class Menu extends Component {

    render() {
        let change = this.props.open ? 'isOpen' : 'isClose';
        return (
            <div className={change} id='menu'>
                <button onClick={this.props.menu} className="closebtn">&times;</button>
                <a href="#hiking-trails">Hike</a>
                <a href="#city-input">Map</a>
                <a href="#hike-results">Results</a>
            </div>
        )
    }
}


