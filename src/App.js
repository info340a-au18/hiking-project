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
            lat: '44.253271',
            lng: '-115.671681',
            hikes: {},
            maxDist: 100,
            maxResults: 100,

        }

    }

    search = (term) => {


        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + term + '&key=AIzaSyBifT_4HbuyAHS6I01s-4ZRjO_P5F3plGg';
        console.log(url);
        /*
        this.setState((state) => {
            return {searchTerm: search}
        })
        */

       let promise = fetch(url);

       promise.then(function(response){
           return response.json();
       })
       .then((data) => {
            console.log(data.results[0].geometry.location.lng,data.results[0].geometry.location.lat);
            this.getLocation(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng);

       })
       .catch(function (err){
           console.log(err);
       });
   
        

    }

    getLocation = (lat, lon) => {
        this.setState((state) => {
             return {
                 lat: lat,
                 lng: lon
             }
        })
        console.log("does this keep doign this");
    }

    render() {
        return (
            <div className='home'>
                <NavBar />
                <Header searchTerm={this.state.searchTerm} lat={this.state.userLat} howToSearch={this.search}
                lng={this.state.userLon} howToSearch={this.search} getLocation={this.getLocation} />
                <Main searchTerm={this.state.searchTerm} lat={this.state.lat} lng={this.state.lng} maxDist={this.state.maxDist} 
                maxResults={this.state.maxResults}/>
                <Footer />
            </div>
        )
    }
}


export default App;