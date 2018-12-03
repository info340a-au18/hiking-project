import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import firebase from 'firebase/app';

export class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      signUp: false
    };
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser){ //signed in!
        this.setState({user: firebaseUser, loading:false})
      } else { //signed out
        this.setState({user: null, loading:false})
      }
    })

  }

  componentWillUnmount() {
    this.authUnRegFunc() //stop listening for auth changes
  }

  //A callback function for registering new users
  handleSignUp = (email, password, handle, avatar) => {
    this.setState({errorMessage:null}); //clear any old errors
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let firebaseUser = userCredential.user;
      //add the username to their account     
      let updateProfile = firebaseUser.updateProfile({
        displayName: handle,
        photoURL:avatar
      });
    return updateProfile;
  })
  .then(
    this.setState({displayName: handle, photoURL:avatar})
  )
  .catch((err) => {
    this.setState({errorMessage: err.message});
    console.log(err);
  })

    /* TODO: sign up user here */
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({errorMessage:null}); //clear any old errors
    console.log(email, password);
    /* TODO: sign in user here */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        this.setState({errorMessage: err.message})
      })
  }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign out user here */
    firebase.auth().signOut()
      .catch((err) => {
        this.setState({errorMessage: err.message})
      })
  }

  newUser = () => {
      this.setState({signUp: true});
  }

  returnUser = () => {
      this.setState({signUp: false});
  }

  render() {

    let content = null; //content to render
    if(!this.state.user) { //if logged out, show signup form
      let greeting = this.state.signUp ? <h1>Sign Up</h1> : <h1>Sign In</h1>;
      content = (
        <div className="container">
          {greeting}
          <SignUpForm 
            signUpCallback={this.handleSignUp} 
            signInCallback={this.handleSignIn}
            signUp={this.state.signUp}
            newUser={this.newUser}
            returnUser={this.returnUser}
            />
        </div>
      );
    } 
    else { //if logged in, show welcome message
      content = (
        <div>
          <WelcomeHeader user={this.state.user}>
            {/* log out button is child element */}
            {this.state.user &&
              <button className="btn btn-warning" onClick={this.handleSignOut}>
                Log Out {this.state.user.displayName}
              </button>
            }
          </WelcomeHeader>
        </div>
      );
    }
    if (this.state.loading){
      return (
      <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>
      )
    } else {
      return (
        <div>
          {this.state.errorMessage &&
            <p className="alert alert-danger">{this.state.errorMessage}</p>
          }
          {content}
        </div>
      );
    }
  }
}

//A component to display a welcome message to a `user` prop (for readability)
class WelcomeHeader extends Component {
  render() {
    return (
      <header className="container">
        <h1>
          Welcome {this.props.user.displayName}!
          {' '}
          <img className="avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} />
        </h1>
        {this.props.children} {/* for button */}
      </header>
    );
  }
}