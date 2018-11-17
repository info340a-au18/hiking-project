import React, { Component } from 'react';

export class HikeCard extends Component{

render(){

    return(

        <div className="card">
            <h2> {this.props.name}</h2>
            <img src={this.props.img} />
            <p> {this.props.desc}</p>
        </div>


    );




}




}

export class CardContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
            hikes : []
        };

    }

    componentDidMount = () => { 

        let promise = fetch('https://www.hikingproject.com/data/get-trails?lat=' + '47.6062095' + '&lon=' + '-122.3320708' + '&maxDistance=200&maxResults=10&key=200378416-92e9bd6c5dd48e7dfa8c0a563189c165');

        promise.then(function(response){
            return response.json();
        })
        .then( (data) => {
            let results = data.trails.map( (hike) => {
                return <HikeCard name={hike.name} desc={hike.summary} img={hike.imgSmall}/>
            });

            console.log("results ", results);

            this.setState(
                {hikes: results}
            );
            


            console.log(data.trails);
        })
        .catch(function (err){
            console.log(err);
        });

        
    }

    render(){

        return (
            <div className="card-container">
            {this.state.hikes}
            </div>
            );
    }

    
}