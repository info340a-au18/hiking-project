import React, { Component } from 'react';

export class HikeInfo extends Component{

    constructor(props){
        super(props);
        this.state = {trail: undefined};
    }

    componentDidMount(){
        console.log(this.props.location.state);
        this.setState({trail: this.props.location.state.hike})
    }

    render(){

        if(!this.state.trail){
            return(<h2>No information available on this trail</h2>)
        }
        return(
            <div>
                <h2>{this.state.trail.name}</h2>
            </div>
        )
    }

}