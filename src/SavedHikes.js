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

    getSaved = () => {
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

    componentDidMount() {
        this.getSaved();
    }
    render() {
        console.log(this.state.displayHikes);
        return <CardContainer pageOfItems={this.state.displayHikes}/>
    }
}
