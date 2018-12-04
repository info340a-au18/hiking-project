import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export class SavedHikes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayHikes: [],
        }
    }

    componentDidMount() {
        // if user is signed in or not
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if(firebaseUser){ //signed in!
                this.setState({user: firebaseUser});
                let hikeRef = firebase.database().ref('users/' + firebaseUser.uid + "/savedHikes");
                hikeRef.on('value', (snapShot) => {
                    let hikeData = snapShot.val();
                    let hikeKeys = Object.keys(hikeData);
                    let hikeArray = hikeKeys.map((key) => {
                        let hike = hikeData[key].hike;
                        hike.key = key;
                        return hike;
                    })
                    this.setState({displayHikes: hikeArray});
                })
            } else { //signed out
                this.setState({user: null});
            }
        });
    }

    render() {
        if (this.state.user) {
            let savedHikes = this.state.displayHikes.map((current) => {
                return <SaveHikeCard hike={current} key={current.id}/>
            })
            return (
                <div className="hike-results card-container">
                    <div className='row'>
                        {savedHikes}
                    </div>
                </div>
            );
        } else {
           return  <h1>Log in or sign up to view saved hikes</h1>
        }
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