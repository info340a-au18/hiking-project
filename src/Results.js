import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import hard from './img/black.png';
import medium from './img/blue.png';
import easy from './img/green.png';
import placeHolder from './img/hiker-mini.jpg'
import up from './img/up.svg';
import { BrowserRouter as Redirect } from 'react-router-dom';
import './Results.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export class HikeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: false
        };
    }

    // Saving hike to Firebase database
    addHike = () => {
        if (this.props.user) {
            this.setState({saved: true});
            let newHike = {
                hike: this.props.hike,
            }
            firebase.database().ref('users/' + this.props.user.uid + "/savedHikes").push(newHike)
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    checkSaved = () => {
        let savedList = this.props.savedHikes;
        for (let i=0; i < savedList.length; i++) {
            if (savedList[i].hike.name === this.props.hike.name) {
                return true;
            }
        }
        return false;
    }
    

    render() {
        let checkSave = this.checkSaved();
        let saveOption;
        if (this.state.saved || checkSave) {
            saveOption = <p className='card-message'>Hike Saved</p>
        } else {
            saveOption = <button onClick={this.addHike} className="btn btn-warning">Save</button>
        }

        if (!this.props.user) {
            saveOption = <p className='card-message'>Log in to save hikes!</p>
        }

        //get rating
        let ratings = [];
        let num = this.props.hike.stars;
        for (let i = 0; i < num - 1; i++) {
            ratings[i] = <img key={i} src={starPic} alt='fullstar' />;
        }
        if (num % 1 !== 0) {
            ratings[ratings.length] = <img key='half' src={halfPic} alt='halfstar' />;
        }
        let stars = ratings.map((star) => {
            return star;
        });
        let img = this.props.hike.imgSmall;
        if (img === '') {
            img = placeHolder;
        }

        let diff;
        if (this.props.hike.difficulty === "green" || this.props.hike.difficulty === "greenBlue") {
            diff = easy;

        } else if (this.props.hike.difficulty === "blue" || this.props.hike.difficulty === "blueBlack") {
            diff = medium;
        } else if (this.props.hike.difficulty === "black" || this.props.hike.difficulty === "blackBlack") {
            diff = hard;
        } else {
            diff = "";
        }

        this.handleClick = () => {
            this.setState({ redirect: true })
        }

        if (this.state.redirect) {
            return <Redirect push
                to={{
                    pathname: "/hiking-project/trail/" + this.props.hike.name,
                    state: { hike: this.props.hike }
                }}
            />
        }
        return (
            <div className="card">
                <a id={'' + this.props.hike.id}>
                    <div className="hoverText">
                        <img src={this.props.hike.imgMedium} alt='the hiking place' />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.hike.name}</h5>
                        <ul className="card-text">
                            <li>Location: {this.props.hike.location}</li>
                            <li>Distance from you: {this.props.hike.distanceAway} Miles</li>
                            <li className='rating'>Ratings: {stars}</li>
                            <li>Length: {this.props.hike.length} Miles</li>
                            <li className='diff'>Difficulty: <img src={diff} alt={diff} /></li>
                            <button onClick={this.handleClick} className="btn btn-dark">More Info</button>
                            {saveOption}
                        </ul>
                    </div>
                </a>
            </div>
        );

    }

}


export class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedHikes: []
        }
    }


    componentDidMount() {
        // if user is signed in or not
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if(firebaseUser){ //signed in!
                this.setState({user: firebaseUser});
                this.hikeRef = firebase.database().ref('users/' + this.state.user.uid + "/savedHikes");
                this.hikeRef.on('value', (snapShot) => {
                    let hikeData = snapShot.val();
                    if (hikeData !== null) {
                        let hikeKeys = Object.keys(hikeData);
                        let hikeArray = hikeKeys.map((key) => {
                            let hike = hikeData[key];
                            hike.id = key;
                            return hike;
                        })
                        this.setState({ savedHikes: hikeArray });
                    }
                })
            } else { //signed out
                this.setState({user: null});
            }
        });
    }

    componentWillUnmount() {
        this.hikeRef.off();
    }

    render() {
        console.log(this.state.user);
        let hikes;
        let first;
        if (this.props.pageOfItems[1] !== undefined) {
            first = this.props.pageOfItems[0].id;
            hikes = this.props.pageOfItems.map((hike) => {
                return (<HikeCard key={hike.id} hike={hike} savedHikes={this.state.savedHikes} user={this.state.user}/>);
            });
        }
        return (
            <div className="hike-results card-container">
                <div className='row'>
                    {hikes}
                    <a className="scroll" href={"#" + first}><img src={up}/></a>
                </div>
            </div>
        );
    }
}