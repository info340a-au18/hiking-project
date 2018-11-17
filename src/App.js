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
            userLat: 0,
            userLon: 0
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
                 userLat: lat,
                 userLon: lon
             }
        })
    }

    render() {
        return (
            <div className='home'>
                <NavBar />
                <Header searchTerm={this.state.searchTerm} userLat={this.state.userLat} userLon={this.state.userLon} howToSearch={this.search} getLocation={this.getLocation}/>
                <Main searchTerm={this.state.searchTerm} userLat={this.state.userLat} userLon={this.state.userLon}/>
                <Footer />
            </div>
        )
    }
}


export default App;