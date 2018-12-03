import React, { Component } from 'react'; //import React Component
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'email': undefined,
            'password': undefined,
            'handle': undefined,
            'avatar': '' //default to blank value
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
        let avatar = this.state.avatar || 'img/no-user-pic.png'; //default to local pic
        this.props.signUpCallback(this.state.email, this.state.password, this.state.handle, avatar);
    }

    //handle signIn button
    handleSignIn = (event) => {
        event.preventDefault(); //don't submit
        this.props.signInCallback(this.state.email, this.state.password);
    }

    render() {
        let signUp = <div><div className="form-group">
            <label htmlFor="handle">User Name</label>
            <input className="form-control"
                id="handle"
                name="handle"
                onChange={this.handleChange}
            />
        </div>

            <div className="form-group">
                <label htmlFor="avatar">Profile Picture</label>
                <InputGroup>
                    <Input />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>Upload Image</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>;
        let signUpButton = <button className="btn btn-success mr-2" onClick={this.handleSignUp}>Sign-up</button>;
        let returnUser = <button className="btn btn-dark mr-2" onClick={this.props.returnUser}>Have an account?</button>;
        let signInButton = <button className="btn btn-success" onClick={this.handleSignIn}>Sign-in</button>;
        let newUser = <button className="btn btn-dark mr-2" onClick={this.props.newUser}>Need an account?</button>;
        return (
            <form>
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

                {this.props.signUp && signUp}

                {/* buttons */}
                <div className="form-group">
                    {this.props.signUp ? signUpButton : signInButton}
                    {this.props.signUp ? returnUser : newUser}
                </div>
            </form >
        )
    }
}

export default SignUpForm