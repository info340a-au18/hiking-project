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

export class HikeInfo extends Component{

    constructor(props){
        super(props);
        this.state = {trail: undefined, comments:undefined};
    }

    componentDidMount() {
        // if user is signed in or not
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if(firebaseUser){ //signed in!
              this.setState({user: firebaseUser});
            } else { //signed out
              this.setState({user: null});
            }
        });

        // store the hike as the state, as well as hike comments
        this.commentRef = firebase.database().ref('hikes/' + this.props.location.state.hike.id);
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
            commentsArray = commentsArray.sort((a, b) => {
                return b.time - a.time;
            })
            this.setState({
                trail: this.props.location.state.hike,
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
                                    + this.props.location.state.hike.id);
        let newUserComment = {
            displayName: this.props.location.state.hike.name,
            text: userReview,
            time: time
        }
        this.userReviewRef.push(newUserComment);
    }


    render(){

        if(!this.state.trail){
            return(<h2>No information available on this trail</h2>)
        }

        let ratings = [];
        let num = this.state.trail.stars;
        for (let i = 0; i < num - 1; i++) {
            ratings[i] = <img key={i} src={starPic} alt='fullstar' />;
        }
        if (num % 1 !== 0) {
            ratings[ratings.length] = <img key='half' src={halfPic} alt='halfstar' />;
        }
        let stars = ratings.map((star) => {
            return star;
        });

        let diff;
        if (this.state.trail.difficulty === "green" || this.state.trail.difficulty === "greenBlue"){
                diff = easy;
            
        } else if (this.state.trail.difficulty === "blue" || this.state.trail.difficulty === "blueBlack"){
                diff = medium;
        } else if (this.state.trail.difficulty === "black" || this.state.trail.difficulty === "blackBlack"){
                diff = hard;
        } else {
            diff = "";
        }

        let trailImg = placeHolder;

        if(this.state.trail.imgMedium){
            trailImg = this.state.trail.imgMedium;
        }

        return(
            <div>
                <h2>{this.state.trail.name}</h2>
                <div className="content-holder">
                    <div className="img-holder">{/* picture */}
                        <img src={trailImg} alt={this.state.trail.name}></img>
                    </div>
                    <div className="info-holder">{/* info */}
                        
                        <ul className="card-text">
                            <li>Location: {this.state.trail.location}</li>
                            <li className='rating'>Ratings: {stars}</li>
                            <li>Length: {this.state.trail.length} miles</li>
                            <li>Elevation: {this.state.trail.ascent} feet</li>
                            <li>Description: {this.state.trail.summary}</li>
                            <li className='diff'>Difficulty: <img src={diff} alt={diff} /></li>
                        </ul>
                    </div>
                </div>

                <div className="comments-holder">
                    <CommentBox user={this.state.user} handleReview={this.handleReview}></CommentBox>
                </div>

                <div className="comments-holder">
                    <HikeCommentList comments={this.state.comments}></HikeCommentList>
                </div>
            </div>
        )
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
            this.setState({review:''})
        } else {
            this.setState({
                errorMessage:"You must write something first!"
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
        return(
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