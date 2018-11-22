import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import {NavBar} from './NavBar';
import {Header} from './Header';
import {Main} from './Main';
import {Footer} from './Footer';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchTerm: '',
            lat: '47.6062',
            lng: '-122.3321',
            hikes: {},
            maxDist: 100,
            maxResults: 30,
            easy: true,
            medium: true,
            hard: true,
            error: false
        }

    }

    search = (term, easy, medium, hard, error) => {


        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + term + '&key=AIzaSyBifT_4HbuyAHS6I01s-4ZRjO_P5F3plGg';

       let promise = fetch(url);

       promise.then(function(response){
           return response.json();
       })
       .then((data) => {
           let address = data.results[0].geometry;
            this.getLocation(address.location.lat,address.location.lng, easy, medium, hard, error);
       })
       .catch((err) => {
           console.log("here");
           this.getError(err);
       });
    }

    getError = (error) => {
        this.setState(() => {
            return {error: error}
        })
    }

    getLocation = (lat, lng, easy, medium, hard, error) => {
        this.setState(() => {
             return {
                 lat: lat,
                 lng: lng,
                 easy: easy,
                 medium: medium,
                 hard: hard,
                 error: error
             }
        })
    }

    render() {
        return (
            <div className='home'>
                <NavBar />
                {this.state.error && <div className="error-message">Address not found</div>}
                <Header searchTerm={this.state.searchTerm} lat={this.state.lat} 
                lng={this.state.lng} howToSearch={this.search} getLocation={this.getLocation} 
                easy={this.state.easy} medium={this.state.medium} hard={this.state.hard}
                error={this.state.error}/>
                <Main searchTerm={this.state.searchTerm} lat={this.state.lat} lng={this.state.lng} 
                maxDist={this.state.maxDist} maxResults={this.state.maxResults}
                easy={this.state.easy} medium={this.state.medium} hard={this.state.hard}
                error={this.state.error}/>
                <Footer />
            </div>
        )
    }
}


export default App;