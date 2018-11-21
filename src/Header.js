import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.scss';


export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        }
    }


    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        if (name === 'searchBar') {
            this.setState({ searchTerm: target.value });
        } 
        this.props.getFilter(target);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.search(event);
    }

    search = (event) => {
        event.preventDefault();
        this.props.howToSearch(this.state.searchTerm, this.props.error);
    }

    getLocation = (event) => {
        event.preventDefault();
        if (!navigator.geolocation) {
            console.log("This browser doesnt support geolocation")
        }

        let success = (position) => {
            this.props.getLocation(position.coords.latitude, position.coords.longitude, this.props.error);
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
                    <form id="searchBox" role="search" aria-label="This is the search box" onSubmit={this.handleSubmit}>
                        <h1>Looking for Hikes near</h1>
                        <input id="searchBar" name="searchBar" aria-label="this is a search bar" type="text"
                            onChange={this.handleChange} placeholder="Current Location" />
                        <button onClick={this.getLocation}>Current Location</button>
                        <button onClick={this.search}>Search</button>
                    </form>
                    <form>
                        <div className="checkbox">
                        <h4>Difficulty level:</h4>
                            <label>
                                Easy:
                            <input
                                    name="easy"
                                    type="checkbox"
                                    checked={this.props.easy}
                                    onChange={this.handleChange} />
                            </label>
                            <label>
                                Medium:
                            <input
                                    name="medium"
                                    type="checkbox"
                                    checked={this.props.medium}
                                    onChange={this.handleChange} />
                            </label>
                            <label>
                                Hard:
                            <input
                                    name="hard"
                                    type="checkbox"
                                    checked={this.props.hard}
                                    onChange={this.handleChange} />
                            </label>
                        </div>
                    </form>
                </div>
            </header>
        )

    }
}