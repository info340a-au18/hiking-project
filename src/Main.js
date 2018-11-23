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
                this.diffFilter();
            })
            .catch(function () {
            });
    }

    diffFilter(){
        let hikesToDisplay = this.state.trailData;
    
        if( !this.props.easy){
            hikesToDisplay = hikesToDisplay.filter( (hike) => {
                return !(hike.difficulty === "green" || hike.difficulty === "greenBlue")
            });
        }
        
        if( !this.props.medium){
            hikesToDisplay = hikesToDisplay.filter( (hike) => {
                return !(hike.difficulty === "blue" || hike.difficulty === "blueBlack")
            });
        }
        
        if (!this.props.hard){
            hikesToDisplay = hikesToDisplay.filter( (hike) => {
                return !(hike.difficulty === "black" || hike.difficulty === "blackBlack")
            });
        }
        this.setState( { displayedTrails: hikesToDisplay} );
        


    }

    componentDidMount() {
        this.getData(this.props.lat, this.props.lng, this.props.maxDist, this.props.maxResults);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.lat !== this.props.lat && prevProps.lng !== this.props.lng){
            this.getData(this.props.lat, this.props.lng, this.props.maxDist, this.props.maxResults);
        }

        if(prevProps.easy !== this.props.easy || prevProps.medium !== this.props.medium || prevProps.hard != this.props.hard){
            this.diffFilter();
        }

    }

    render() {
        let error;
        if (this.state.trailData.length === 0) {
            error = <div className="error-message">Cannot find hikes :(</div>;
        }
        return (
            <main aria-label="contains the main content of the page">
                {error}
                <div className="section">
                    <MapArea lat={this.props.lat} lng={this.props.lng} trails={this.state.displayedTrails} />
                </div>

                <div className="section">
                    <CardContainer trails={this.state.displayedTrails} 
                    easy={this.props.easy} 
                    medium={this.props.medium} 
                    hard={this.props.hard} />
                </div>
            </main>
        )
    }
}