import React, { Component } from 'react';
import { CardContainer } from './Results';
import { MapArea } from './Map';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.scss';

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = { trailData: {}, displayedTrails: {}, newLocation: false };
    }

    //Search term from form is passed in as this.props.searchTerm
    //User Latitude from header button passed in as this.props.userLat
    //User Longitude from header button passed in as this.props.userLon

    getData(lat, lng, maxDist, maxResults) {
        let promise = fetch('https://www.hikingproject.com/data/get-trails?lat=' + lat +
            '&lon=' + lng + '&maxDistance=' + maxDist + '&maxResults=' +
            maxResults + '&key=200378416-92e9bd6c5dd48e7dfa8c0a563189c165');

        promise.then(function (response) {
            return response.json();
        })
            .then((data) => {
                this.setState(
                    {
                        trailData: data.trails,
                        displayedTrails: data.trails
                    }
                );
            })
            .catch(function (err) {
            });
    }

    componentDidMount() {
        this.getData(this.props.lat, this.props.lng, this.props.maxDist, this.props.maxResults);
    }

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.lat, nextProps.lng, nextProps.maxDist, nextProps.maxResults);
    }

    render() {
        if (this.state.trailData.length === 0) {
            return <div className="error-message">Cannot find hikes :(</div>
        } else {
            return (
                <main aria-label="contains the main content of the page">
                    <div className="section">
                        <MapArea id="map" lat={this.props.lat} lng={this.props.lng} trails={this.state.trailData} error={this.props.error}
                            getError={this.props.getError} />
                    </div>

                    <div className="section">
                        <CardContainer trails={this.state.trailData} easy={this.props.easy}
                            medium={this.props.medium} hard={this.props.hard} error={this.props.error}
                            getError={this.props.getError} />
                    </div>
                </main>
            )
        }
    }
}