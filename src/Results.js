import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import './Results.scss';

export class HikeCard extends Component {

    render() {
        let stars = this.props.stars.map((star) => {
            return star;
        })
        return (
            <div className="card">
                <img className='p-3' src={this.props.img} alt='the hiking place' />
                <div className="card-body">
                    <h5 className="card-title">{this.props.name}</h5>
                    <ul className="card-text">
                        <li>Location: {this.props.location}</li>
                        <li className='rating'>Ratings: {stars}</li>
                        <li>Length: {this.props.length} miles</li>
                        <li>Description: {this.props.desc}</li>
                        <li>Difficulty: {this.props.difficulty}</li>
                        <button href={this.props.url} className="btn btn-dark">More Info</button>
                    </ul>
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
                    let ratings = [];
                    let num = hike.stars;
                    for (let i = 0; i < num - 1; i++) {
                        ratings[i] = <img key={i} src={starPic} alt='fullstar' />;
                    }
                    if (num % 1 !== 0) {
                        ratings[ratings.length] = <img key='half' src={halfPic} alt='halfstar' />;
                    }
                    return <HikeCard key={hike.name} name={hike.name} desc={hike.summary}
                        img={hike.imgSmall} location={hike.location}
                        length={hike.length} difficulty={hike.difficulty}
                        url={hike.url} stars={ratings} />
                });

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