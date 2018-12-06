import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './UserComments.css';
import './Account.scss';

import Moment from 'react-moment';

export class UserComments extends Component {
    constructor(props) {
        super(props);
        this.state = {comments:[], loading:true };
    }

    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if(firebaseUser){ //signed in!
                this.setState({user: firebaseUser, loading:false });
                // gets the trails saved by the signed in user from Firebase
                this.commentRef = firebase.database().ref('users/' + this.state.user.uid + '/userReviews');
                this.commentRef.on('value', (snapshot) => {
                    let val = snapshot.val();
                    let commentsArray = undefined;
                    if (val) {
                        let commentKeys = Object.keys(val);
                        commentsArray = commentKeys.map((key) => {
                            let obj = val[key];
                            obj.id = key;
                            return obj;
                        })
                    }
                    this.setState({
                        comments: commentsArray
                    });
                });
            } else { //signed out
                this.setState({user: null, loading:false });
            }
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="text-center">
                  <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>);
        }
        if (this.state.comments) {
            // comments = an array of array
            // each element is an array of all the comments for a single hike
            let comments = this.state.comments.map((item) => {
                let itemKey = Object.keys(item);
                let hikeId = item[itemKey.pop()];
                let commentsArray = itemKey.map((key) => {
                    let obj = item[key];
                    obj.id = key;
                    obj.hikeId = hikeId;
                    return obj;
                })
                return commentsArray;
            })
            let renderedComments = comments.map((item, index) => {
                return <Comment comment={item} key={index}></Comment>
            })
            return (
                <div>
                    <h1 className="text-box">Your Reviews</h1>

                    <div className="col">
                        {renderedComments}
                    </div>

                    {/* quick fix so footer doesn't cover comments */}
                    <div className="hidden">
                        <p>buffer</p>
                        <p>buffer</p>
                        <p>buffer</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1 className="text-box">No Hikes Reviewed</h1>
                </div>
            )
        }
    }
}

class Comment extends Component {
    render() {
        let item = this.props.comment;
        item = item.sort((a, b) => {
            return b.time - a.time;
        })
        let renderComments = item.map((comment, index) => {
            return <SingleComment comment={comment} key={index}></SingleComment>
        })
        return (
            <div className="card mx-auto">
                <div className="card-body">
                    <h5 className="card-title">
                        <a href={"#/trail/" + item[0].hikeId}>{item[0].displayName}</a>
                    </h5>
                    {renderComments}
                </div>
            </div>
            
        );
    }
}

class SingleComment extends Component {
    render() {
        let item = this.props.comment;
        let time = 
                <p className="card-subtitle mb-2 text-muted">
                    <Moment date={item.time} fromNow></Moment>
                </p>
        if (item.edited) {
            time = 
                <p className="card-subtitle mb-2 text-muted">
                    <Moment date={item.time} fromNow></Moment> (edited)
                </p>
        }
        return (
            <div className="border">
            {time}
            <p className="card-text">{item.text}</p>
            </div>
        )
    }
}