import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import './Results.scss';
import JwPagination from 'jw-react-pagination';

export class HikeCard extends Component {

    render() {
        let stars = this.props.stars.map((star) => {
            return star;
        })
        return (
            <div className="card">
                <img className='p-3' src={this.props.hike.imgSmall} alt='the hiking place' />
                <div className="card-body">
                    <h5 className="card-title">{this.props.hike.name}</h5>
                    <ul className="card-text">
                        <li>Location: {this.props.hike.location}</li>
                        <li className='rating'>Ratings: {stars}</li>
                        <li>Length: {this.props.hike.length} miles</li>
                        <li>Description: {this.props.hike.summary}</li>
                        <li>Difficulty: {this.props.hike.difficulty}</li>
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

    componentWillReceiveProps(props){
        this.setState({trails:props.trails})
    }

    onChangePage(pageOfItems){
        this.setState({pageOfItems})
    }

    render() {
        console.log("results ", this.props.trails);
        console.log('trails', this.state.trails)

        if(this.props.trails[1] === undefined){
            return <h2> Loading </h2>;
        }
        
        return (
            <div className="hike-results card-container">
                <div className='row'>
                    {this.state.pageOfItems.map((hike) => {
                        let ratings = [];
                        let num = hike.stars;
                        for (let i = 0; i < num - 1; i++) {
                            ratings[i] = <img key={i} src={starPic} alt='fullstar' />;
                        }
                        if (num % 1 !== 0) {
                            ratings[ratings.length] = <img key='half' src={halfPic} alt='halfstar' />;
                        }
                        return <HikeCard key={hike.name} hike = {hike} stars={ratings}/>
                    })}
                    {console.log(this.state.trails, this.state.pageOfItems)}
                </div>
                <div className='pagination-holder'>
                    <JwPagination items={this.state.trails} onChangePage={this.onChangePage}/>
                </div>
            </div>
        );
    }


}