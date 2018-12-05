import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './UserComments.css';

export class UserComments extends Component {
    render() {
        return (
            <div>
                <h1>Your Reviews!</h1>
            </div>
        );
    }
}