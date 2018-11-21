import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import black from './img/black.png';
import blue from './img/blue.png';
import green from './img/green.png';
import placeHolder from './img/hiker-mini.jpg'
import './Results.scss';
import JwPagination from 'jw-react-pagination';

export class HikeCard extends Component {

    render() {
        let stars = this.props.stars.map((star) => {
            return star;
        });
        let img = this.props.hike.imgSmall;
        if (img === ''){
            img = placeHolder;
        } 
        return (
            <div className="card">
                <img className='p-3' src={img} alt='the hiking place' />
                <div className="card-body">
                    <h5 className="card-title">{this.props.hike.name}</h5>
                    <ul className="card-text">
                        <li>Location: {this.props.hike.location}</li>
                        <li className='rating'>Ratings: {stars}</li>
                        <li>Length: {this.props.hike.length} miles</li>
                        <li>Description: {this.props.hike.summary}</li>
                        <li className='diff'>Difficulty: {this.props.difficulty}</li>
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
            trails: this.props.trails,
            pageOfItems: []
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ trails: props.trails })
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems })
    }

    render() {

        if (this.props.error) {
            return '';
        } else {
            let count = 0;
            return (
                <div className="hike-results card-container">
                    <div className='row'>
                        {this.state.pageOfItems.map((hike) => {
                            count++;
                            //get rating
                            let ratings = [];
                            let num = hike.stars;
                            for (let i = 0; i < num - 1; i++) {
                                ratings[i] = <img key={i} src={starPic} alt='fullstar' />;
                            }
                            if (num % 1 !== 0) {
                                ratings[ratings.length] = <img key='half' src={halfPic} alt='halfstar' />;
                            }
                            //get difficulty
                            let diff;
                            if (hike.difficulty === 'green' || hike.difficulty === 'greenBlue') {
                                if (this.props.easy !== false) {
                                    diff = <img src={green} alt='easy hike' />
                                }
                            } else if (hike.difficulty === 'blue' || hike.difficulty === 'blueBlack') {
                                if (this.props.medium !== false) {
                                    diff = <img src={blue} alt='medium hike' />
                                }
                            } else if (hike.difficulty === 'black' || hike.difficulty === 'blackBlack') {
                                if (this.props.hard !== false) {
                                    diff = <img src={black} alt='hard hike' />
                                }
                            }
                            if (diff !== undefined) {
                                return <HikeCard key={hike.name + count} hike={hike} stars={ratings} difficulty={diff} />
                            } else {
                                return '';
                            }
                        })}
                    </div>
                    <div className='pagination-holder'>
                        <JwPagination items={this.state.trails} onChangePage={this.onChangePage} 
                        pageSize={6} disableDefaultStyles={true}/>
                    </div>
                </div>
            );
        }
    }


}