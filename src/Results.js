import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import hard from './img/black.png';
import medium from './img/blue.png';
import easy from './img/green.png';
import placeHolder from './img/hiker-mini.jpg'
import up from './img/up.svg';
import { BrowserRouter as Redirect,Link } from 'react-router-dom';
import './Results.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export class HikeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: false,
        };
    }

    // Saving hike to Firebase database
    addHike = () => {
        if (this.props.user) {
            this.setState({ saved: true });
            let newHike = {
                hike: this.props.hike,
            }
            firebase.database().ref('users/' + this.props.user.uid + "/savedHikes").push(newHike)
                .catch((err) => {
                    this.setState({ errorMessage: err.message })
                })
        }
    }

    // Checks if the hike is saved into Firebase or not 
    checkSaved = () => {
        if (this.props.savedHikes) {
            let savedList = this.props.savedHikes;
            for (let i = 0; i < savedList.length; i++) {
                if (savedList[i].hike.name === this.props.hike.name) {
                    return true;
                }
            }
        }
        return false;
    }

    // Removes a hike from Firebase
    removeHike = () => {
        let saveRef = this.props.saveRef;
        let hikeRef;

        for (let i = 0; i < saveRef.length; i++) {
            if (saveRef[i].hike.name === this.props.hike.name) {
                hikeRef = firebase.database().ref('users/' + this.props.user.uid + "/savedHikes/" + saveRef[i].key);
                hikeRef.remove();    
                if (saveRef.length === 1) {
                    this.props.lastSaved();
                }
                break;
            }
        }
    }

    render() {
        let saveOption;
        let checkSave = this.checkSaved();

        // If a user is logged in, indicate if the hike is already saved or display a button to save
        if (this.state.saved || checkSave) {
            saveOption = <p className='card-message'>Hike Saved</p>
        } else {
            saveOption = <button onClick={this.addHike} className="btn btn-warning">Save</button>
        }

        // If a user is not logged in, link to account page to login or sign up 
        if (!this.props.user) {
            saveOption = <p className="card-message"><a href="#/Account">Sign-in to save hikes!</a></p>
        }

        // For when displaying cards on the Save Page, a remove button is added to unsave hikes
        if (this.props.savePage) {
            saveOption = <button onClick={this.removeHike} className="btn btn-danger">Remove</button>
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

        // just a giant if to render a nicer looking page for the more info page
        if (this.props.moreInfoPage) {
            img = this.props.hike.imgMedium
            if (!img) {
                img = placeHolder
            }
            return (
                <>
                        <div className="text-box">
                        <h1>{this.props.hike.name}</h1>
                        </div>
                        <div className="img-holder" style={{backgroundImage: "url(" + img + ")"}}>{/* picture */}
                            {/* <img className="img-moreInfo" src={img} alt={this.props.hike.name}></img> */}
                        </div>
                        <div className="info-holder">{/* info */}
                            
                            <ul className="card-text">
                                <li>Location: {this.props.hike.location}</li>
                                <li className='rating'>Ratings: {stars}</li>
                                <li>Length: {this.props.hike.length} miles</li>
                                <li>Elevation: {this.props.hike.ascent} feet</li>
                                <li>Description: {this.props.hike.summary}</li>
                                <li className='diff'>Difficulty: <img src={diff} alt={diff} /></li>
                            </ul>
                        </div>
                        <button className="btn btn-dark"><a href={"https://www.google.com/maps/dir//"+this.props.hike.latitude+","+this.props.hike.longitude}>Directions</a></button>
                </>
            )
        }
        let topDivClasses = ""
        if (this.props.accountPage) {
            topDivClasses = "border-0 card-hover"
        }
        return (
            <div id={this.props.hike.id} className={"card " + topDivClasses} onClick={this.markCompleted}>
                {this.state.errorMessage &&
                    <div className="alert alert-danger">{this.state.errorMessage}</div>
                }
                    <div className="hoverText">
                        <img className="card-img-top" src={this.props.hike.imgMedium} alt='the hiking place' />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.hike.name}</h5>
                        <ul className="card-text">
                            <li>Location: {this.props.hike.location}</li>
                            <li>Distance from you: {this.props.hike.distanceAway} Miles</li>
                            <li className='rating'>Ratings: {stars}</li>
                            <li>Length: {this.props.hike.length} Miles</li>
                            <li className='diff'>Difficulty: <img src={diff} alt={diff} /></li>
                            <button className="btn btn-dark"><Link to={"/trail/"+this.props.hike.id}>More Info</Link></button>
                            {saveOption}
                        </ul>
                    </div>
                    </div>
                
        );

    }

}


export class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedHikes: [],
            user: {}
        }
    }

    componentDidMount() {
        // if user is signed in or not
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) { //signed in!
                this.setState({ user: firebaseUser });
                this.hikeRef = firebase.database().ref('users/' + this.state.user.uid + "/savedHikes");
                this.hikeRef.on('value', (snapShot) => {
                    let hikeData = snapShot.val();
                    if (hikeData !== null) {
                        let hikeKeys = Object.keys(hikeData);
                        let hikeArray = hikeKeys.map((key) => {
                            let hike = hikeData[key];
                            hike.key = key;
                            return hike;
                        })
                        this.setState({ savedHikes: hikeArray });
                    }
                })
            } else { //signed out
                this.setState({ user: null });
            }
        });
    }

    componentWillUnmount() {
        if (this.hikeref) {
            this.hikeRef.off();
        }
    }

    render() {
        let hikes;
        let first;
        if (this.props.pageOfItems[1] !== undefined) {
            first = this.props.pageOfItems[0].id;
            hikes = this.props.pageOfItems.map((hike) => {
                return (<HikeCard key={hike.id} hike={hike} savedHikes={this.state.savedHikes} user={this.state.user} />);
            });
        }
        return (
            <div className="hike-results card-container">
                <div className='row'>
                    {hikes}
                    <a className="scroll" href={"#" + first}><img src={up} alt="Up" /></a>
                </div>
            </div>
        );
    }
}