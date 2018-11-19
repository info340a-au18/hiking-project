import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import {NavBar} from './NavBar';
import {Header} from './Header';
import {Main} from './Main';
import {Footer} from './Footer';
import {Results, HikeCard, CardContainer} from './Results';
import {MapArea} from './Map';

class App extends Component {



    constructor(props){
        super(props);

        this.state = {
            searchTerm: '',
            lat: '47.6062095',
            lng: '-122.3320708',
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

    render() {
        console.log(this.state.searchTerm);
        return (
            <div className='home'>
                <NavBar />
                <Header searchTerm={this.state.searchTerm} howToSearch={this.search}/>
                <Main searchTerm={this.state.searchTerm}/>
                <div id="hikemap">
                <MapArea lat={this.state.lat} lng={this.state.lng} />
                </div>
                <CardContainer lat={this.state.lat} lng={this.state.lng} maxDist={this.state.maxDist} maxResults={this.state.maxResults}/>
            </div>
        )
    }
}


export default App;