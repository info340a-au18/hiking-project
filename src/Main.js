import React, { Component } from 'react';
import {CardContainer} from './Results';
import {MapArea} from './Map';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.scss';

export class Main extends Component {   

    constructor(props){
        super(props);
        this.state = { trailData: {},displayedTrails: {}, newLocation: false};

        console.log("st",this.props.searchTerm)
    }

    //Search term from form is passed in as this.props.searchTerm
    //User Latitude from header button passed in as this.props.userLat
    //User Longitude from header button passed in as this.props.userLon

    getData(lat,lng,maxDist,maxResults){
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
                displayedTrails : data.trails }
            );
        

        })
        .catch(function (err) {
            console.log(err);
        });
    }

   componentDidMount(){
        this.getData(this.props.lat,this.props.lng,this.props.maxDist,this.props.maxResults);
    }

    componentWillReceiveProps(nextProps){
        this.getData(nextProps.lat,nextProps.lng,nextProps.maxDist,nextProps.maxResults);
    }

    render() {
       
        return (
            <main aria-label="contains the main content of the page">
            <div className="section">
            <MapArea lat={this.props.lat} lng={this.props.lng} trails={this.state.trailData}/>
            </div>
            <div className="section">
            {console.log("td",this.state.trailData)}
            <CardContainer trails={this.state.trailData} />
            </div>
            </main>
        ) 
    }
}