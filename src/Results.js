import React, { Component } from 'react';
import './Results.scss';

export class HikeCard extends Component {

    render() {

        return (
            <div className='cardSet col-md-6 col-lg-4 col-xl-3'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-sm-6 col-lg-12'>
                                <img className='pb-3' src={this.props.img} alt='the hiking place' />
                            </div>
                            <div className='col-sm-6 col-lg-12'>
                                <h4>{this.props.name}</h4>
                                <div className='info'>
                                    <ul className='card-text'>
                                        <li>Location: {this.props.name}</li>
                                        <li>Rating: {this.props.stars}</li>
                                        <li>Length: {this.props.length} miles</li>
                                        <li>Description: {this.props.desc}</li>
                                        <li>Difficulty: {this.props.difficulty}</li>
                                        <button className='btn btn-dark' src={this.props.url}>Go</button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export class CardContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng,
            maxDist: this.props.maxDist,
            maxResults: this.props.maxResults,
            hikes: []
        };

    }

    componentDidMount = () => {

        let promise = fetch('https://www.hikingproject.com/data/get-trails?lat=' + this.state.lat +
            '&lon=' + this.state.lng + '&maxDistance=' + this.state.maxDist + '&maxResults=' +
            this.state.maxResults + '&key=200378416-92e9bd6c5dd48e7dfa8c0a563189c165');

        promise.then(function (response) {
            return response.json();
        })
            .then((data) => {
                let results = data.trails.map((hike) => {
                    return <HikeCard key={hike.name} name={hike.name} desc={hike.summary}
                        img={hike.imgSmall} location={hike.location}
                        length={hike.length} difficulty={hike.difficulty}
                        url={hike.url} stars={hike.stars} />
                });

                console.log("results ", results);

                this.setState(
                    { hikes: results }
                );



                console.log(data.trails);
            })
            .catch(function (err) {
                console.log(err);
            });


    }

    render() {

        return (
            <div className="hike-results card-container">
                <div className='row'>
                    {this.state.hikes}
                </div>
            </div>
        );
    }


}