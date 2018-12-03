import React, { Component } from 'react';
import { CardContainer } from './Results';

import firebase from 'firebase/app';
import 'firebase/database';

export class SavedHikes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayHikes: [],
        }
    }

    componentDidMount() {
        let hikeRef = firebase.database().ref('saved');
        hikeRef.on('value', (snapShot) => {
            let hikeData = snapShot.val();
            let hikeKeys = Object.keys(hikeData);
            let hikeArray = hikeKeys.map((key) => {
                let hike = hikeData[key];
                hike.id = key;
                return hike;
            })
            let hikeInfo = hikeArray.map((current) => {
            return current.hike;
            })
            this.setState({displayHikes: hikeInfo});
        })
    }
    render() {
        
        let savedHikes = this.state.displayHikes.map((current) => {
            return <SaveHikeCard hike={current} />
        })
        return (
            <div className="hike-results card-container">
                <div className='row'>
                    {savedHikes}
                </div>
            </div>
        );
    }
}

class SaveHikeCard extends Component {
    render() {
        return (
            <div className="card">
                <a id={'' + this.props.hike.id}>
                    <div className="hoverText">
                        <img src={this.props.hike.imgMedium} alt='the hiking place' />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.hike.name}</h5>
                        <p className="card-text">{this.props.hike.location}</p>

                    </div>
                </a>
            </div>
        );
    }
}
