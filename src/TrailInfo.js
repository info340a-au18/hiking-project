import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import hard from './img/black.png';
import medium from './img/blue.png';
import easy from './img/green.png';
import placeHolder from './img/hiker-mini.jpg';
import './HikeInfo.scss';
import firebase from 'firebase/app';
import Moment from 'react-moment';
import './SignUpForm.scss';
import { HikeCard } from './Results';

export class TrailInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { trail: undefined, comments: undefined };
    }

    componentDidMount() {

        let url = "https://www.hikingproject.com/data/get-trails-by-id?ids=" + this.props.match.params.hikeId + "&key=200378416-92e9bd6c5dd48e7dfa8c0a563189c165";

        let promise = fetch(url);

        promise.then((response) => {
            return response.json();
        })
            .then((data) => {
                console.log("here", data);
                let hike = data.trails[0];

                this.setState({ hike: hike });

            })
            .catch(function () {
            });


        // if user is signed in or not
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) { //signed in!
                this.setState({ user: firebaseUser });
            } else { //signed out
                this.setState({ user: null });
            }
        });

        // store the hike as the state, as well as hike comments
        this.commentRef = firebase.database().ref('hikes/' + this.props.match.params.hikeId);
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
                commentsArray = commentsArray.sort((a, b) => {
                    return b.time - a.time;
                })
            }
            this.setState({
                comments: commentsArray
            });
        });

    }

    componentWillUnmount() {
        this.commentRef.off();
    }

    handleReview = (userReview) => {
        let time = firebase.database.ServerValue.TIMESTAMP;

        // update firebase database
        let newComment = {
            text: userReview,
            time: time,
            user: this.state.user.uid,
            userName: this.state.user.displayName,
            userPhoto: this.state.user.photoURL
        }
        this.commentRef.push(newComment);

        // update user's review list
        this.userReviewRef = firebase.database().ref('users/' + this.state.user.uid + '/userReviews/'
            + this.props.match.params.hikeId);
        let newUserComment = {
            displayName: this.state.hike.name,
            text: userReview,
            time: time
        }
        this.userReviewRef.push(newUserComment);
    }


    render() {

        if (!this.state.hike) {
            return (<h2>No information available on this trail</h2>)
        } else {
            return (
                <div>
                    <HikeCard hike={this.state.hike} />

                    <div className="comments-holder">
                        <CommentBox user={this.state.user} handleReview={this.handleReview}></CommentBox>
                    </div>

                    <div className="comments-holder">
                        <HikeCommentList comments={this.state.comments}></HikeCommentList>
                    </div>
                </div>
            );
        }

    }
}

// Expected props
//   user = the firebase user object
//   handleReview = function to update reviews on firebase
class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: ''
        }
    }

    handleReview = (event) => {
        event.preventDefault();
        // alert if user didn't write anything
        if (this.state.review) {
            this.props.handleReview(this.state.review);
            this.setState({ review: '' })
        } else {
            this.setState({
                errorMessage: "You must write something first!"
            })
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            review: value
        });
    }

    render() {
        if (!this.props.user) return null;

        return (
            <div>
                <h2>User Reviews</h2>
                {this.state.errorMessage &&
                    <div className="alert alert-danger">{this.state.errorMessage}</div>
                }


                <form>
                    <div className="form-group mb2">
                        <textarea className="form-control" name="reivew" value={this.state.review} placeholder="Add a review..." onChange={this.handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleReview}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

// Expected props:
//   comments: the firebase object for comments
class HikeCommentList extends Component {
    render() {
        if (!this.props.comments) return null;
        let renderedComments = this.props.comments.map((item, index) => {
            return <HikeComment key={index} comment={item}></HikeComment>
        });
        return (
            <div>
                {renderedComments}
            </div>
        );
    }
}

// expected props:
//   comment - comment object
class HikeComment extends Component {
    render() {
        let comment = this.props.comment;
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img className="avatar" src={comment.userPhoto} alt={comment.userName} />
                        {comment.userName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        <Moment date={comment.time} fromNow></Moment>
                    </h6>
                    <p className="card-text">{comment.text}</p>
                </div>
            </div>
        );
    }
}