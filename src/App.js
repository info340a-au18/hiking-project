import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import {NavBar} from './NavBar';
import {Header} from './Header';
import {Main} from './Main';
import {Footer} from './Footer';
import {Results, HikeCard, CardContainer} from './Results';

class App extends Component {



    constructor(props){
        super(props);

        this.state = {
            searchTerm: ''
        }

    }

    search = (search) => {
        this.setState((state) => {
            return {searchTerm: search}
        })
    }

    render() {
        console.log(this.state.searchTerm);
        return (
            <div className='home'>
                <NavBar />
                <Header searchTerm={this.state.searchTerm} howToSearch={this.search}/>
                <Main searchTerm={this.state.searchTerm}/>
                <CardContainer />
            </div>
        )
    }
}


export default App;