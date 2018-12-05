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
        return updateProfile;
      })
      .then((user) => {
        this.setState({ user: user })
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      })

    /* TODO: sign up user here */
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({ errorMessage: null }); //clear any old errors
    /* TODO: sign in user here */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log("hi");
        this.setState({ errorMessage: err.message })
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
              <button id="signOut" onClick={this.handleSignOut}>Log Out</button>
            }
          </WelcomeHeader>
          <SavedHikes />
          <UserComments />
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
            <p className="alert alert-danger">{this.state.errorMessage}</p>
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
        <h1>
          Welcome {name}!
          <img className="avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} />
        </h1>
        {this.props.children} {/* for button */}
      </main>
    );
  }
}