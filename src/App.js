import React, { Component } from 'react'; //import React Component
import { Switch, Route } from 'react-router-dom';
import {HomePage} from './HomePage';
import {Account} from './Account';
import {SavedHikes} from './SavedHikes';
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
                    <Route exact path='/SavedHikes' component={SavedHikes}/>
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default App;