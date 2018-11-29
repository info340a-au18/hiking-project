import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import current from './img/location.svg';
import search from './img/search.svg';
import loading from './img/Loading.svg';
import hard from './img/black.png';
import medium from './img/blue.png';
import easy from './img/green.png';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

//Initalizes the settings for rc-sliders, a react packages that makes range sliders easier to implement
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            filterShow: false
        }
    }

    changeDistance = (value) => {
        this.props.changeDistance(value);
    }

    changeElevation = (value) => {
        this.props.changeElevation(value);
    }

    filterToggle = () => {

        this.setState({
            filterShow: !this.state.filterShow
        });
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
        if (this.state.searchTerm === "") {
            this.props.getError("Address not found");
        } else {
            this.props.getError("");
            this.props.howToSearch(this.state.searchTerm, this.props.error);
        }
    }

    //Gets the users location from the browser
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
            <header id="headline" aria-label="contains the navbar of the page">
                <form id="searchBox" role="search" aria-label="This is the search box" onSubmit={this.handleSubmit}>
                    <h1>Search for Hikes near</h1>
                    <input id="searchBar" name="searchBar" aria-label="this is a search bar" type="text"
                        onChange={this.handleChange} placeholder="Enter Location" />
                    <LoadingButton onClick={this.getLocation} img={current} />
                    <LoadingButton onClick={this.search} img={search} />
                </form>
                {!this.state.filterShow && <button onClick={this.filterToggle}> Show Filters</button>}
                {this.state.filterShow && <button onClick={this.filterToggle}> Hide Filters</button>}

                { this.state.filterShow &&
                <div className="filters-container">
                <form className="checkbox">
                    <h4>Difficulty level:</h4>
                    <label aria-label="easy">
                        <img src={easy} alt="easy" />
                        Easy:
                            <input name="easy"
                            type="checkbox"
                            checked={this.props.easy}
                            onChange={this.handleChange} />
                    </label>
                    <label aria-label="medium">
                        <img src={medium} alt="medium" />
                        Medium:
                            <input name="medium"
                            type="checkbox"
                            checked={this.props.medium}
                            onChange={this.handleChange} />
                    </label>
                    <label aria-label="hard">
                        <img src={hard} alt="hard" />
                        Hard:
                            <input name="hard"
                            type="checkbox"
                            checked={this.props.hard}
                            onChange={this.handleChange} />
                    </label>
                </form>
                <h4>Filter by Distance</h4>
                <div className="slider">
                {/* These are rangesliders from the rc-slider package, here I give them visible lables and set their ranges */}
                <Range min={0} max={100} defaultValue={[0, 100]} tipFormatter={value => `${value}`} tipProps={{visible:true}} onAfterChange={this.changeDistance} />
                </div>
                <h4>Filter by Elevation</h4>
                <div className="slider">
                <Range min={0} max={6000} defaultValue={[0, 6000]} tipFormatter={value => `${value}`} tipProps={{visible:true}} onAfterChange={this.changeElevation} />
                </div>
                </div>
                }
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

    handleClick = (event) => {
        this.setState({ loading: true });
        this.props.onClick(event);
        // This probably where you would have an `ajax` call
        setTimeout(() => {
            // Completed of async action, set loading state back
            this.setState({ loading: false });
        }, 1000);
    }



    render() {
        let display = this.state.loading ? <img src={loading} alt="loading" /> : <img src={this.props.img} alt="get current location" />;
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