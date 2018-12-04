import React, { Component } from 'react';
import {HikeCard} from './Results'
import './SavedHikes.css';
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
                // gets the trails saved by the signed in user from Firebase
                this.hikeRef = firebase.database().ref('users/' + firebaseUser.uid + "/savedHikes");
                this.hikeRef.on('value', (snapShot) => {
                    let hikeData = snapShot.val();
                    if (hikeData !== null) {
                        let hikeKeys = Object.keys(hikeData);
                        let hikeArray = hikeKeys.map((key) => {
                            let hike = hikeData[key].hike;
                            hike.key = key;
                            return hike;
                        })
                        this.setState({displayHikes: hikeArray});
                    }
                })
            } else { //signed out
                this.setState({user: null});
            }
        });
    }

    componentWillUnmount() {
        if( this.hikeref){
            this.hikeRef.off();
        }
    }

    render() {
        if (this.state.user) {
            let savedHikes = this.state.displayHikes.map((current) => {
                return <HikeCard hike={current} key={current.id}/>
            })
            return (
                <div className="hike-results card-container">
                    <div className='row'>
                        {savedHikes}
                    </div>
                </div>
            );
        } else {
           return  (
               <div className="no-sign-in">
                   <a href="#/Account"><button type="button" className="btn btn-dark btn-lg">Login or Sign Up to View Saved Hikes </button></a>
               </div>
           )
        }
    }
}