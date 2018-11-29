import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import hard from './img/black.png';
import medium from './img/blue.png';
import easy from './img/green.png';
import placeHolder from './img/hiker-mini.jpg';
import './HikeInfo.scss';

export class HikeInfo extends Component{

    constructor(props){
        super(props);
        this.state = {trail: undefined};
    }

    componentDidMount(){
        console.log(this.props.location.state);
        this.setState({trail: this.props.location.state.hike})
    }

    render(){

        if(!this.state.trail){
            return(<h2>No information available on this trail</h2>)
        }

        let ratings = [];
        let num = this.state.trail.stars;
        for (let i = 0; i < num - 1; i++) {
            ratings[i] = <img key={i} src={starPic} alt='fullstar' />;
        }
        if (num % 1 !== 0) {
            ratings[ratings.length] = <img key='half' src={halfPic} alt='halfstar' />;
        }
        let stars = ratings.map((star) => {
            return star;
        });

        let diff;
        if (this.state.trail.difficulty === "green" || this.state.trail.difficulty === "greenBlue"){
                diff = easy;
            
        } else if (this.state.trail.difficulty === "blue" || this.state.trail.difficulty === "blueBlack"){
                diff = medium;
        } else if (this.state.trail.difficulty === "black" || this.state.trail.difficulty === "blackBlack"){
                diff = hard;
        } else {
            diff = "";
        }

        let trailImg = placeHolder;

        if(this.state.trail.imgMedium){
            trailImg = this.state.trail.imgMedium;
        }

        return(
            <div>
                <h2>{this.state.trail.name}</h2>
                <div className="content-holder">
                    <div className="img-holder">{/* picture */}
                        <img src={trailImg} alt={this.state.trail.name}></img>
                    </div>
                    <div className="info-holder">{/* info */}
                        
                        <ul className="card-text">
                            <li>Location: {this.state.trail.location}</li>
                            <li className='rating'>Ratings: {stars}</li>
                            <li>Length: {this.state.trail.length} miles</li>
                            <li>Elevation: {this.state.trail.ascent} feet</li>
                            <li>Description: {this.state.trail.summary}</li>
                            <li className='diff'>Difficulty: <img src={diff} alt={diff} /></li>
                        </ul>
                        <div className="comments-holder">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}