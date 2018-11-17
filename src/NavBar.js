import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.scss';
import logo from './img/Hamburger.png';


export class NavBar extends Component{
    render(){
        return(
            <nav>
                <ul>
                    <li><a className="logo" href="index.html"> ExploreMore </a> </li>
                    <li> <a href="#city-input"> Find a Hike </a></li>
                    <li> <a href="#hikemap"> Map</a></li>
                    <li> <a href="#hike-results"> Results </a></li>
                </ul>
                <div>
                    <img src={logo} alt='icon' />
                    <h1>WA HIKIERS</h1>
                </div>
            </nav>
        );
    }
}


