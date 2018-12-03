
import React, { Component } from 'react';
import { CardContainer } from './Results';
import { MapArea } from './Map';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.scss';

import firebase from 'firebase/app';
import 'firebase/database';

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = { trailData: {}, displayedTrails: {}, newLocation: false, pageOfItems: {}, savedHikes: [], cardShown: undefined };
    }

    //Search term from form is passed in as this.props.searchTerm
    //User Latitude from header button passed in as this.props.userLat
    //User Longitude from header button passed in as this.props.userLon


    //derived from https://stackoverflow.com/questions/43167417/calculate-distance-between-two-points-in-leaflet
    getDistance = (origin, destination) => {
        // return distance in meters
        var lon1 = this.toRadian(origin[1]),
            lat1 = this.toRadian(origin[0]),
            lon2 = this.toRadian(destination[1]),
            lat2 = this.toRadian(destination[0]);

        var deltaLat = lat2 - lat1;
        var deltaLon = lon2 - lon1;

        var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
        var c = 2 * Math.asin(Math.sqrt(a));

        //Earth radius in miles
        var EARTH_RADIUS = 3959;

        return (c * EARTH_RADIUS).toFixed(2);
    }
    toRadian = (degree) => {
        return degree * Math.PI / 180;
    }

    getData = (lat, lng, maxDist, maxResults) => {
        let promise = fetch('https://www.hikingproject.com/data/get-trails?lat=' + lat +
            '&lon=' + lng + '&maxDistance=' + maxDist + '&maxResults=' +
            maxResults + '&key=200378416-92e9bd6c5dd48e7dfa8c0a563189c165');

        promise.then((response) => {
            return response.json();
        })
            .then((data) => {

                let hikes = data.trails;

                hikes.forEach((hike) => {
                    //console.log(this.props.lat, hike.latitude);
                    hike.distanceAway = this.getDistance([this.props.lat, this.props.lng], [hike.latitude, hike.longitude]);
                });

                this.setState(
                    {
                        trailData: hikes,
                        displayedTrails: hikes
                    }
                );

                this.diffFilter();
            })
            .catch(function () {
            });
    }

    //Filter the list of hikes by difficulty
    diffFilter(hikesToDisplay) {


        if (!this.props.easy) {
            hikesToDisplay = hikesToDisplay.filter((hike) => {
                return !(hike.difficulty === "green" || hike.difficulty === "greenBlue")
            });
        }

        if (!this.props.medium) {
            hikesToDisplay = hikesToDisplay.filter((hike) => {
                return !(hike.difficulty === "blue" || hike.difficulty === "blueBlack")
            });
        }

        if (!this.props.hard) {
            hikesToDisplay = hikesToDisplay.filter((hike) => {
                return !(hike.difficulty === "black" || hike.difficulty === "blackBlack")
            });
        }

        return hikesToDisplay;
    }

    //Filter hikes by distance
    distFilter(hikesToDisplay) {

        hikesToDisplay = hikesToDisplay.filter((hike) => {

            return (hike.length >= this.props.distance[0] && hike.length <= this.props.distance[1]);
        });

        return hikesToDisplay;
    }

    //Filter hikes by elevation
    elevFilter(hikesToDisplay) {

        hikesToDisplay = hikesToDisplay.filter((hike) => {

            return (hike.ascent >= this.props.elevation[0] && hike.ascent <= this.props.elevation[1]);
        });

        return hikesToDisplay;
    }

    //Use all of the above filters. (This makes sure that prexisting filters are applied when a new one is applied)
    applyAllFilters = (hikesToDisplay) => {
        hikesToDisplay = this.diffFilter(hikesToDisplay);
        hikesToDisplay = this.distFilter(hikesToDisplay);
        hikesToDisplay = this.elevFilter(hikesToDisplay);

        this.setState({
            displayedTrails: hikesToDisplay
        });
    }

    componentDidMount() {
        this.getData(this.props.lat, this.props.lng, this.props.maxDist, this.props.maxResults);

        // Gets an array of the trails saved in the Firebase database
        let hikeRef = firebase.database().ref('saved');
        hikeRef.on('value', (snapShot) => {
            let hikeData = snapShot.val();
            let hikeKeys = Object.keys(hikeData);
            let hikeArray = hikeKeys.map((key) => {
                let hike = hikeData[key];
                hike.id = key;
                return hike;
            })
            let hikeInfo = hikeArray.map((current) => {
                return current.hike;
            })
            this.setState({ savedHikes: hikeInfo });
        })
    }

    //Intercepts prop updates to fetch data and filter the list of hikes
    componentDidUpdate(prevProps, prevState) {
        let hikesToDisplay = this.state.trailData;

        if (prevProps.lat !== this.props.lat && prevProps.lng !== this.props.lng) {
            this.getData(this.props.lat, this.props.lng, this.props.maxDist, this.props.maxResults);
        }

        if (prevProps.easy !== this.props.easy || prevProps.medium !== this.props.medium || prevProps.hard !== this.props.hard) {
            this.applyAllFilters(hikesToDisplay);
        }

        if (prevProps.distance !== this.props.distance) {
            this.applyAllFilters(hikesToDisplay);
        }


        if (prevProps.elevation !== this.props.elevation) {
            this.applyAllFilters(hikesToDisplay);

        }


    }


    showCard = (hike) => {
        console.log(hike);
        this.setState({ cardShown: hike })
    }

    render() {
        let error;
        if (this.state.displayedTrails.length === 0) {
            error = <div className="error-message">No Hikes Found With These Filters</div>;
        }
        return (
            <div>
                {error}
                <main aria-label="contains the main content of the page" id="main">
                    <div className="container">
                        <div className="section" id="map">
                            <MapArea lat={this.props.lat} lng={this.props.lng} trails={this.state.displayedTrails} />
                        </div>
                        <div className="section" id="card">
                            <CardContainer pageOfItems={this.state.displayedTrails} />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}