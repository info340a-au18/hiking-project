import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import firebase from 'firebase/app';
import sun from './img/sun.mp4';
import './Account.scss';
import { SavedHikes } from './SavedHikes';
import { UserComments } from './UserComments';

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      loading: true
    };
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) { //signed in!
        this.setState({ user: firebaseUser, loading: false })
      } else { //signed out
        this.setState({ user: null, loading: false })
      }
    })
  }

  componentWillUnmount() {
    this.authUnRegFunc() //stop listening for auth changes
  }

  //A callback function for registering new users
  handleSignUp = (email, password, handle, avatar) => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let firebaseUser = userCredential.user;
        //add the username to their account     
        let updateProfile = firebaseUser.updateProfile({
          displayName: handle,
          photoURL: avatar
        });
        this.setState({ user: firebaseUser})
        return updateProfile;
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      })
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({ errorMessage: null }); //clear any old errors
    /* TODO: sign in user here */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        this.setState({ user: firebaseUser.user});
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      })
  }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({ errorMessage: null }); //clear any old errors

    /* TODO: sign out user here */
    firebase.auth().signOut()
      .catch((err) => {
        this.setState({ errorMessage: err.message })
      })
  }

  render() {
    let content = null; //content to render
    if (!this.state.user) { //if logged out, show signup form
      
      content = (
        <div className="login">
          <SignUpForm
            signInCallback={this.handleSignIn}
            signUpCallback={this.handleSignUp}
            signUp={this.state.signUp}
            returnUser={this.returnUser}
          />
        </div>);
    }
    else { //if logged in, show welcome message
      content = (
        <div>
          <WelcomeHeader user={this.state.user}>
            {this.state.user &&
              <button id="signOut" className="btn btn-dark" onClick={this.handleSignOut}>Log Out</button>
            }
          </WelcomeHeader>
          <SavedHikes />
          <UserComments/>
        </div>
      );
    }
    if (this.state.loading) {
      return (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      )
    } else {
      return (
        <div id="Account">
          {this.state.errorMessage &&
            <div className="alert alert-danger">{this.state.errorMessage}</div>
          }
          {content}
          <video id="video-background" muted loop autoPlay>
            <source src={sun} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
  }
}

//A component to display a welcome message to a `user` prop (for readability)
class WelcomeHeader extends Component {
  render() {
    let name = this.props.user.displayName;
    if (!name){
      name = 'User';
    }
    return (
      <main className="welcome">
        <h1 className="text-box"> Welcome {name}! </h1>
        <div className="col d-flex justify-content-center">
          <img className="userPhoto" src={this.props.user.photoURL} alt={this.props.user.displayName} />
        </div>
        <div className="col d-flex justify-content-center">
          {this.props.children} {/* for button */}
        </div>
      </main>
    );
  }
}