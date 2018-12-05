import React, { Component } from 'react';
import starPic from './img/star.png';
import halfPic from './img/half.png';
import hard from './img/black.png';
import medium from './img/blue.png';
import easy from './img/green.png';
import placeHolder from './img/hiker-mini.jpg';
import './HikeInfo.scss';
import firebase from 'firebase/app';
// import Moment from 'react-moment';
import './SignUpForm.css';
import { HikeCard } from './Results';


export class TrailInfo extends Component{


    constructor(props){
        super(props);
        this.state = { hike: {}};
    }



    componentDidMount = () =>{


        let url = "https://www.hikingproject.com/data/get-trails-by-id?ids="+ 7001635 + "&key=200378416-92e9bd6c5dd48e7dfa8c0a563189c165";

        let promise = fetch(url);

        promise.then((response) => {
            return response.json();
        })
            .then((data) => {
                console.log("here",data);
                let hike = data.trails[0];

                this.setState({ hike: hike });

            })
            .catch(function () {
            });
    }
    



    render(){
        
        return(
            <HikeCard hike={this.state.hike} />
        );
    }

}