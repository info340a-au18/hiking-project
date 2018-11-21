import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.scss';


export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            easy: true,
            medium: true,
            hard: true
        }
    }


    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        if (name === 'searchBar'){ 
            this.setState({ searchTerm: target.value});
        } else {
            if(target.checked){
                this.setState({[name]: target.value});
            } else {
                this.setState({[name]: !target.value});
            }
        }
    }

    search = (event) => {
        event.preventDefault();
        this.props.howToSearch(this.state.searchTerm, this.state.easy, 
            this.state.medium, this.state.hard)
    }

    getLocation = (event) => {
        event.preventDefault();
        if (!navigator.geolocation) {
            console.log("This browser doesnt support geolocation")
        }

        let success = (position) => {
            this.props.getLocation(position.coords.latitude, position.coords.longitude, 
                this.state.easy, this.state.medium, this.state.hard);
        }
        let error = () => {
            console.log("Couldnt get user location");
        }
        navigator.geolocation.getCurrentPosition(success, error);

    }

    render() {
        return (
            <header aria-label="contains the navbar of the page">
                <div id="headline" aria-label="This is the headline for the page">
                    <h1>Looking for hiking sites close to you?</h1>
                </div>
                <form id="searchBox" role="search" aria-label="This is the search box">
                    <input id="searchBar" name="searchBar" aria-label="this is a search bar" type="text" onChange={this.handleChange} placeholder="Searching current location" />
                    <button id="search" onClick={this.search}>
                        Search
                        <i className="fa fa-search fa-rotate-90" aria-hidden="true" aria-label="this is a search icon"></i>
                    </button>
                    <button id="location" onClick={this.getLocation}>
                        Get my Location
                    </button>
                    <div className="checkbox">
                        <label>
                            Easy:
                            <input
                                name="easy"
                                type="checkbox"
                                checked={this.state.easy}
                                onChange={this.handleChange} />
                        </label>
                        <label>
                            Medium:
                            <input
                                name="medium"
                                type="checkbox"
                                checked={this.state.medium}
                                onChange={this.handleChange} />
                        </label>
                        <label>
                            Hard:
                            <input
                                name="hard"
                                type="checkbox"
                                checked={this.state.hard}
                                onChange={this.handleChange} />
                        </label>
                    </div>
                </form>
            </header>
        )

    }
}