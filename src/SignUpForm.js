import React, { Component } from 'react'; //import React Component
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import './SignUpForm.scss';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'email': undefined,
            'password': undefined,
            'handle': undefined,
            'avatar': '', //default to blank value
            signUp: false
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

    switch = () => {
        this.setState({ signUp: !this.state.signUp});
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

    render() {
        let greeting = this.state.signUp ? <h1>Sign Up</h1> : <h1>Sign In</h1>;
        let signIn = <div>
            <div className="form-group">
                <button className="btn btn-dark m-2" onClick={this.switch}>New user?</button>
                <button className="btn btn-success m-2" onClick={this.handleSignIn}>Sign-in</button>
            </div>
        </div>;
        let signUp = <div>
            {/* user name */}
            <div className="form-group">
                <label htmlFor="handle">User Name</label>
                <input className="form-control"
                    id="handle"
                    name="handle"
                    onChange={this.handleChange}
                />
            </div>

            {/* avatar */}
            <div className="form-group">
                <label htmlFor="avatar">Profile Picture</label>
                <InputGroup>
                    <Input />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>Upload Image</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div className="form-group">
                <button className="btn btn-dark m-2" onClick={this.switch}>Return user?</button>
                <button className="btn btn-success m-2" onClick={this.handleSignUp}>Sign-up</button>
            </div>
        </div>;
        return (
            <form>
                {greeting}

                {/* email */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control"
                        id="email"
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                    />
                </div>

                {/* password */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control"
                        id="password"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                </div>

                {this.state.signUp ? signUp : signIn}
            </form >
        )
    }
}

export default SignUpForm