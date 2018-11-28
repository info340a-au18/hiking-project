import React, { Component } from 'react'; //import React Component
import { Switch, Route, Link, Redirect, NavLink } from 'react-router-dom';
import {HomePage} from './HomePage';
import {Account} from './Account';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

class App extends Component {
    render() {

        return (
            <div>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/Account' component={Account} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default App;