import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './UserComments.css';
import Moment from 'react-moment';

export class UserComments extends Component {
    constructor(props) {
        super(props);
        this.state = {comments:[]};
        let user = this.props.user;
        if (user) {
            this.commentRef = firebase.database().ref('users/' + user.uid + '/userReviews');
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
            
        }
    }

    render() {
        if (this.state.comments) {
            let comments = this.state.comments.map((item) => {
                let itemKey = Object.keys(item)[0];
                return item[itemKey];
            })
            let renderedComments = comments.map((item, index) => {
                return <Comment comment={item} key={index}></Comment>
            })
            return (
                <div>
                    <h1>Your Reviews</h1>

                    <div className="col">
                        {renderedComments}
                    </div>

                    {/* quick fix so footer doesn't cover comments */}
                    <div className="hidden">
                        <p className="card-text">buffer</p>
                        <p className="card-text">buffer</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Start Review Hikes!</h1>
                </div>
            )
        }
    }
}

class Comment extends Component {
    render() {
        let item = this.props.comment;
        return (
                
            <div className="card mx-auto">
                <div className="card-body">
                    <h5 className="card-title">
                        {item.displayName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        <Moment date={item.time} fromNow></Moment>
                    </h6>
                    <p className="card-text">{item.text}</p>
                </div>
            </div>
            
        );
    }
}