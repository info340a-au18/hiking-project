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

    }

    render() {

        console.log("results ", this.props.trails);

        if(this.props.trails[1] === undefined){
            return <h2> Loading </h2>;
        }

        let hikeCards = this.props.trails.map((hike) => {
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

        return (
            <div className="hike-results card-container">
                <div className='row'>
                    {hikeCards}
                </div>
            </div>
        );
    }


}