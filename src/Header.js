import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.scss';

export class Header extends Component {
    render() {
        return (
            <header aria-label="contains the navbar of the page">
                <div id="headline" aria-label="This is the headline for the page">
                    <h1>Looking for hiking sites close to you?</h1>
                </div>
                <div id="searchBox" role="search" aria-label="This is the search box">
                    <input aria-label="this is a search bar" type="text" placeholder="Search by address..." />
                    <button id="search">
                        <i className="fa fa-search fa-rotate-90" aria-hidden="true" aria-label="this is a search icon"></i>
                    </button>
                </div>
            </header>
        )

    }
}