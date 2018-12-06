import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './HomePage.scss';
import {Header} from './Header';
import {Main} from './Main';

export class HomePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchTerm: '',
            lat: '47.6062',
            lng: '-122.3321',
            maxDist: 100,
            maxResults: 30,
            easy: true,
            medium: true,
            hard: true,
            distance: [0,200],
            elevation: [0,6000],
            error: "",
            loading: true
        }

    }

    search = (term, error) => {


        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + term + '&key=AIzaSyBifT_4HbuyAHS6I01s-4ZRjO_P5F3plGg';

       let promise = fetch(url);

       promise.then(function(response){
           return response.json();
       })
       .then((data) => {
           let address = data.results[0].geometry;
            this.getLocation(address.location.lat,address.location.lng, error);
       })
       .catch((err) => {
           this.getError(err);
       });
    }

    getError = (error) => {
        this.setState(() => {
            return {error: error}
        })
    }

    getLocation = (lat, lng, error) => {
        this.setState(() => {
             return {
                 lat: lat,
                 lng: lng,
                 error: error
             }
        })
    }

    getFilter = (target) => {
        let name = target.name;
        if (target.checked) {
            this.setState({ [name]: target.value });
        } else {
            this.setState({ [name]: !target.value });
        }
    }

    changeDistance = (value) => {
        this.setState({
            distance: value
        });
    }

    changeElevation = (value) => {
        this.setState({
            elevation: value
        });
    }

    render() {

        let error = this.state.error !== "" ? <div className="error-message">{this.state.error}</div>: null;
        return (
            <div className='home'>
                <Header 
                    searchTerm={this.state.searchTerm} 
                    lat={this.state.lat} 
                    lng={this.state.lng} 
                    howToSearch={this.search} 
                    getFilter={this.getFilter} 
                    getLocation={this.getLocation} 
                    easy={this.state.easy} 
                    medium={this.state.medium} 
                    hard={this.state.hard}
                    error={this.state.error} 
                    getError={this.getError}
                    changeDistance={this.changeDistance}
                    changeElevation={this.changeElevation}/>
                {error}
                <Main searchTerm={this.state.searchTerm} 
                    lat={this.state.lat} lng={this.state.lng} 
                    maxDist={this.state.maxDist} 
                    maxResults={this.state.maxResults}
                    easy={this.state.easy} 
                    medium={this.state.medium} 
                    hard={this.state.hard}
                    distance={this.state.distance}
                    elevation={this.state.elevation}
                    
                    />
            </div>
        )
    }
}