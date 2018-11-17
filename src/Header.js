import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.scss';

export class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchTerm: '',
        }
    }

    handleChange = (event) => {
        this.setState({searchTerm: event.target.value});
        console.log(event.target.value);
    }

    search = (event) => {
        event.preventDefault();
        this.props.howToSearch(this.state.searchTerm)
    }

    getLocation = (event) => {
        event.preventDefault();
        if (!navigator.geolocation) {
            
        }

        let success = (position) => {
            this.props.getLocation(position.coords.latitude, position.coords.longitude)
        }
        let error = (position) => {
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
                    <input aria-label="this is a search bar" type="text" onChange={this.handleChange} placeholder="Search by address..." />
                    <button id="search" onClick={this.search}>
                        Search
                        <i className="fa fa-search fa-rotate-90" aria-hidden="true" aria-label="this is a search icon"></i>
                    </button>
                    <button id="location" onClick={this.getLocation}>
                        Get my Location
                    </button>
                </form>
            </header>
        )

    }
}