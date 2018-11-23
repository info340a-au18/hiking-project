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

    diffFilter(hikesToDisplay){
        
    
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
        
        return hikesToDisplay;
    }

    distFilter(hikesToDisplay){
       
        hikesToDisplay = hikesToDisplay.filter( (hike) => {
         
            return (hike.length >= this.props.distance[0] && hike.length <= this.props.distance[1]);
        });

        return hikesToDisplay;
    }

    elevFilter(hikesToDisplay){
       
        hikesToDisplay = hikesToDisplay.filter( (hike) => {

            return (hike.ascent >= this.props.elevation[0] && hike.ascent <= this.props.elevation[1]);
        });

        return hikesToDisplay;
    }

    applyAllFilters = (hikesToDisplay) =>{
        hikesToDisplay = this.diffFilter(hikesToDisplay);
        hikesToDisplay = this.distFilter(hikesToDisplay);
        hikesToDisplay = this.elevFilter(hikesToDisplay);

        this.setState({
            displayedTrails: hikesToDisplay
        });
    }

    componentDidMount() {
        this.getData(this.props.lat, this.props.lng, this.props.maxDist, this.props.maxResults);
    }

    componentDidUpdate(prevProps, prevState){
        let hikesToDisplay = this.state.trailData;

        if(prevProps.lat !== this.props.lat && prevProps.lng !== this.props.lng){
            this.getData(this.props.lat, this.props.lng, this.props.maxDist, this.props.maxResults);
        }

        if(prevProps.easy !== this.props.easy || prevProps.medium !== this.props.medium || prevProps.hard !== this.props.hard){
            this.applyAllFilters(hikesToDisplay);
        }

        if(prevProps.distance !== this.props.distance){
            this.applyAllFilters(hikesToDisplay);
        }

        
        if(prevProps.elevation !== this.props.elevation){
            this.applyAllFilters(hikesToDisplay);
            
        }


    }

    render() {
        let error;
        if (this.state.displayedTrails.length === 0) {
            error = <div className="error-message">No Hikes Available</div>;
        }
        return (
            <main aria-label="contains the main content of the page">
                {error}
                <div className="section">
                    <MapArea lat={this.props.lat} lng={this.props.lng} trails={this.state.displayedTrails} />
                </div>

                <div className="section">
                    <CardContainer trails={this.state.displayedTrails}  />
                </div>
            </main>
        )
    }
}