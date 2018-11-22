import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import current from './img/location.svg';
import search from './img/search.svg';
import loading from './img/Loading.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.scss';


export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ""
        }
    }


    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        if (name === 'searchBar') {
            this.setState({ searchTerm: target.value });
            this.props.getError("");
        } 
        this.props.getFilter(target);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.search(event);
    }

    search = (event) => {
        event.preventDefault();
        if (this.state.searchTerm === ""){
            this.props.getError("Address not found");
        } else {
            this.props.getError("");
            this.props.howToSearch(this.state.searchTerm, this.props.error);
        }  
    }

    getLocation = (event) => {
        event.preventDefault();
        if (!navigator.geolocation) {
            this.props.getError("This browser doesnt support geolocation");
        }

        let success = (position) => {
            this.props.getError("");
            this.props.getLocation(position.coords.latitude, position.coords.longitude, this.props.error);
        }
        let error = () => {
            this.props.getError("Blocked user location");
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }

    render() {
        return (
            <header aria-label="contains the navbar of the page">
                <div id="headline" aria-label="This is the headline for the page">
                    <form id="searchBox" role="search" aria-label="This is the search box" onSubmit={this.handleSubmit}>
                        <h1>Looking for Hikes near</h1>
                        <input id="searchBar" name="searchBar" aria-label="this is a search bar" type="text"
                            onChange={this.handleChange} placeholder="Search by Address" />
                        <LoadingButton onClick={this.getLocation} img={current}/>
                        <LoadingButton onClick={this.search} img={search}/>
                    </form>
                    <form>
                        <div className="checkbox">
                        <h4>Difficulty level:</h4>
                            <label>
                                Easy:
                            <input
                                    name="easy"
                                    type="checkbox"
                                    checked={this.props.easy}
                                    onChange={this.handleChange} />
                            </label>
                            <label>
                                Medium:
                            <input
                                    name="medium"
                                    type="checkbox"
                                    checked={this.props.medium}
                                    onChange={this.handleChange} />
                            </label>
                            <label>
                                Hard:
                            <input
                                    name="hard"
                                    type="checkbox"
                                    checked={this.props.hard}
                                    onChange={this.handleChange} />
                            </label>
                        </div>
                    </form>
                </div>
            </header>
        )

    }
}

//cite from the react button page to make loading button
class LoadingButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false
      };
    }
  
    handleClick =(event) => {
      this.setState({ loading: true });
      this.props.onClick(event);
      // This probably where you would have an `ajax` call
      setTimeout(() => {
        // Completed of async action, set loading state back
        this.setState({ loading: false });
      }, 1000);
    }

    
  
    render() {
        let display = this.state.loading ? <img src={loading} alt="loading"/> : <img src={this.props.img} alt="get current location"/>;
      return (
        <Button  
          disabled={this.state.loading}
          onClick={!this.state.loading ? this.handleClick : null}
        >
        {display}
        </Button>
      );
    }
  }