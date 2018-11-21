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
            maxResults: 100,
            easy: true,
            medium: true,
            hard: true
        }

    }

    search = (term, easy, medium, hard) => {


        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + term + '&key=AIzaSyBifT_4HbuyAHS6I01s-4ZRjO_P5F3plGg';
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
           console.log(data.results[0].geometry);
            this.getLocation(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng, easy, medium, hard);

       })
       .catch(function (err){
           console.log(err);
       });
   
        

    }

    getLocation = (lat, lng, easy, medium, hard) => {
        this.setState(() => {
             return {
                 lat: lat,
                 lng: lng,
                 easy: easy,
                 medium: medium,
                 hard: hard
             }
        })
    }

    render() {
        return (
            <div className='home'>
                <NavBar />
                <Header searchTerm={this.state.searchTerm} lat={this.state.lat} 
                lng={this.state.lng} howToSearch={this.search} getLocation={this.getLocation} 
                easy={this.state.easy} medium={this.state.medium} hard={this.state.hard}/>
                <Main searchTerm={this.state.searchTerm} lat={this.state.lat} lng={this.state.lng} 
                maxDist={this.state.maxDist} maxResults={this.state.maxResults}
                easy={this.state.easy} medium={this.state.medium} hard={this.state.hard}/>
                <Footer />
            </div>
        )
    }
}


export default App;