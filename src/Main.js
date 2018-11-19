import React, { Component } from 'react';
import {CardContainer} from './Results';
import {MapArea} from './Map';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.scss';

export class Main extends Component {   

    //Search term from form is passed in as this.props.searchTerm
    //User Latitude from header button passed in as this.props.userLat
    //User Longitude from header button passed in as this.props.userLon

    render() {
        return (
            <main aria-label="contains the main content of the page">
            <div className="section">
                <MapArea lat={this.props.lat} lng={this.props.lng} />
            </div>
            <div className="section">
                <CardContainer lat={this.props.lat} 
                    lng={this.props.lng} 
                    maxDist={this.props.maxDist} 
                    maxResults={this.props.maxResults}/>
            </div>
            </main>
        ) 
    }
}