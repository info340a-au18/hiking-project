import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './UserComments.css';

export class UserComments extends Component {
    componentDidMount() {
        // if user is signed in or not
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if(firebaseUser){ //signed in!
              this.setState({user: firebaseUser});
            } else { //signed out
              this.setState({user: null});
            }
        });

    //     // store the hike as the state, as well as hike comments
    //     this.commentRef = firebase.database().ref('hikes/' + this.props.location.state.hike.id);
    //     this.commentRef.on('value', (snapshot) => {
    //         let val = snapshot.val();
    //         let commentsArray = undefined;
    //         if (val) {
    //             let commentKeys = Object.keys(val);
    //             commentsArray = commentKeys.map((key) => {
    //                 let obj = val[key];
    //                 obj.id = key;
    //                 return obj;
    //             })
    //         }
    //         this.setState({
    //             trail: this.props.location.state.hike,
    //             comments: commentsArray
    //         });
    //     });
    }

    render() {
        return (
            <div>
                <h1>Your Reviews!</h1>

            </div>
        );
    }
}