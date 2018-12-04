import React, { Component } from 'react'; //import React Component
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import './SignUpForm.css';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'email': undefined,
            'password': undefined,
            'handle': undefined,
            'avatar': '', //default to blank value
            'signIn':true
        };
    }

    //update state for specific field
    handleChange = (event) => {
        let field = event.target.name; //which input
        let value = event.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    //handle signUp button
    handleSignUp = (event) => {
        event.preventDefault(); //don't submit
        let avatar = this.state.avatar || 'https://catking.in/wp-content/uploads/2017/02/default-profile-1.png'; //default to local pic
        this.props.signUpCallback(this.state.email, this.state.password, this.state.handle, avatar);
    }

    //handle signIn button
    handleSignIn = (event) => {
        event.preventDefault(); //don't submit
        this.props.signInCallback(this.state.email, this.state.password);
    }

    changeLogInScreen = () => {
        this.setState({signIn:!this.state.signIn})
    }

    render() {
        let signUpButton = <button className="btn btn-success mr-2" onClick={this.handleSignUp}>Sign-up</button>;
        let returnUser = <button className="btn btn-dark mr-2" onClick={this.changeLogInScreen}>Have an account?</button>;
        let signInButton = <button className="btn btn-success mr-2" onClick={this.handleSignIn}>Sign-in</button>;
        let newUser = <button className="btn btn-dark mr-2" onClick={this.changeLogInScreen}>Need an account?</button>;
        let email = 
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control"
                    id="email"
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                />
            </div>;
        let password = 
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control"
                    id="password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                />
            </div>
        let username =
            <div className="form-group">
                <label htmlFor="handle">User Name</label>
                <input className="form-control"
                    id="handle"
                    name="handle"
                    onChange={this.handleChange}
                />
            </div>
        let profilePic = 
            <div className="form-group">
                <img className="avatar" src={this.state.avatar || 'https://catking.in/wp-content/uploads/2017/02/default-profile-1.png'} alt="avatar preview" />
                <label htmlFor="avatar">Avatar Image URL</label>
                <input className="form-control" 
                    id="avatar" 
                    name="avatar" 
                    placeholder="http://www.example.com/my-picture.jpg" 
                    onChange={this.handleChange}
                    />
            </div>
        if (this.state.signIn) {
            return (
                <div>
                <h1>Sign In</h1>
                <form>
                    {email}
                    {password}

                    {/* buttons */}
                    <div className="form-group">
                        {signInButton}
                        {newUser}
                    </div>
                </form>
                </div>
            )
        } else {
            return (
                <div>
                <h1>Sign Up</h1>
                <form>
                    {email}
                    {password}
                    {username}
                    {profilePic}

                    {/* buttons */}
                    <div className="form-group">
                        {signUpButton}
                        {returnUser}
                    </div>
                </form>
                </div>
            )
        }
    }
}

export default SignUpForm;