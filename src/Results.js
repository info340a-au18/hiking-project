import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import hard from './img/black.png';
import medium from './img/blue.png';
import easy from './img/green.png';
import placeHolder from './img/hiker-mini.jpg'
import './Results.scss';
import JwPagination from 'jw-react-pagination';

export class HikeCard extends Component {

    render() {
        //get rating
        let ratings = [];
        let num = this.props.hike.stars;
        for (let i = 0; i < num - 1; i++) {
            ratings[i] = <img key={i} src={starPic} alt='fullstar' />;
        }
        if (num % 1 !== 0) {
            ratings[ratings.length] = <img key='half' src={halfPic} alt='halfstar' />;
        }
        let stars = ratings.map((star) => {
            return star;
        });
        let img = this.props.hike.imgSmall;
        if (img === '') {
            img = placeHolder;
        }

        let diff;
        if (this.props.hike.difficulty === "green" || this.props.hike.difficulty === "greenBlue"){
                diff = easy;
            
        } else if (this.props.hike.difficulty === "blue" || this.props.hike.difficulty === "blueBlack"){
                diff = medium;
        } else if (this.props.hike.difficulty === "black" || this.props.hike.difficulty === "blackBlack"){
                diff = hard;
        } else {
            diff = "";
        }
       

        return (
            <div className="card">
                <img className='p-3' src={this.props.hike.imgMedium} alt='the hiking place' />
                <div className="card-body">
                    <h5 className="card-title">{this.props.hike.name}</h5>
                    <ul className="card-text">
                        <li>Location: {this.props.hike.location}</li>
                        <li className='rating'>Ratings: {stars}</li>
                        <li>Length: {this.props.hike.length} miles</li>
                        <li>Elevation: {this.props.hike.ascent} feet</li>
                        <li>Description: {this.props.hike.summary}</li>
                        <li className='diff'>Difficulty: <img src={diff} alt={diff} /></li>
                        <button href={this.props.hike.url} className="btn btn-dark">More Info</button>
                    </ul>
                </div>
            </div>
        );

    }

}


export class CardContainer extends Component {

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);

        this.state = {
            pageOfItems: this.props.trails,
        }
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems });
    }

    filterDiff = (hike) => {

    }

    render() {
        let hikes;
        if (this.state.pageOfItems[1] !== undefined) {
            hikes = this.state.pageOfItems.map((hike) => {
                let diff = this.filterDiff(hike);
                    return (<HikeCard key={hike.id} hike={hike} />);    
            });
        } 
        return (
            <div className="hike-results card-container">
                <div className='row'>
                    {hikes}
                </div>
                <div className='pagination-holder'>
                    <JwPagination items={this.props.trails} onChangePage={this.onChangePage}
                        pageSize={6} disableDefaultStyles={true} />
                </div>
            </div>
        );
    }



}