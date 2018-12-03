import React, { Component } from 'react'; //import React Component
import { Switch, Route, Redirect } from 'react-router-dom';
import {HomePage} from './HomePage';
import {Account} from './Account';
import {SavedHikes} from './SavedHikes';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { HikeInfo } from './HikeInfo';

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/Account' component={Account} />
                    <Route path='/trail/:hikeName' component={HikeInfo} />
                    <Route exact path='/SavedHikes' component={SavedHikes}/>
                    <Redirect to="/" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default App;