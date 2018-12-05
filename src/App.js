import React, { Component } from 'react'; //import React Component
import { Switch, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { Account } from './Account';
import { SavedHikes } from './SavedHikes';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { HikeInfo } from './HikeInfo';

class App extends Component {

    getHikes = (hikes) => {

        this.setState({ hikes: hikes });
    }

    constructor(props) {
        super(props);

        this.state = { hikes: undefined };
    }

    render = () => {
        console.log("first",this.getHikes);
        return (
            <div >
                <NavBar />
                <Switch>
                    <Route path='/Account' component={Account} />
                    <Route path='/trail/:hikeName' component={HikeInfo} />
                    <Route path='/SavedHikes' component={SavedHikes} />
                    <Route render={ (props) => <HomePage {...props}  bird={"yoot"} getHikes={this.getHikes} />} />
                </Switch>
                <Footer id="footer" />
            </div>
        )
    }
}

export default App;