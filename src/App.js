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
                    <Route exact path='/Home' component={HomePage} />
                    <Route path='/hiking-project/Account' component={Account} />
                    <Route path='/trail/:hikeName' component={HikeInfo} />
                    <Route path='/hiking-project/SavedHikes' component={SavedHikes}/>
                    <Route component={HomePage} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default App;