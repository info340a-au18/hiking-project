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
            maxResults: 10,

        }

    }

    search = (search) => {
        this.setState((state) => {
            return {searchTerm: search}
        })
    }

    getLocation = (lat, lon) => {
        this.setState((state) => {
             return {
                 lat: lat,
                 lng: lon
             }
        })
    }

    render() {
        return (
            <div className='home'>
                <NavBar />
                <Header searchTerm={this.state.searchTerm} lat={this.state.userLat} 
                lng={this.state.userLon} howToSearch={this.search} getLocation={this.getLocation}/>
                <Main searchTerm={this.state.searchTerm} lat={this.state.lat} lng={this.state.lng} maxDist={this.state.maxDist} 
                maxResults={this.state.maxResults}/>
                <Footer />
            </div>
        )
    }
}


export default App;