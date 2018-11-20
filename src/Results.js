import React, { Component } from 'react';
import './Results.scss';
import JwPagination from 'jw-react-pagination';

export class HikeCard extends Component {

    render() {

        return (
            <div className='cardSet col-md-6 col-lg-4 col-xl-3'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-sm-6 col-lg-12'>
                                <img className='pb-3' src={this.props.img} alt='the hiking place' />
                            </div>
                            <div className='col-sm-6 col-lg-12'>
                                <h4>{this.props.name}</h4>
                                <div className='info'>
                                    <ul className='card-text'>
                                        <li>Location: {this.props.name}</li>
                                        <li>Rating: {this.props.stars}</li>
                                        <li>Length: {this.props.length} miles</li>
                                        <li>Description: {this.props.desc}</li>
                                        <li>Difficulty: {this.props.difficulty}</li>
                                        <button className='btn btn-dark' src={this.props.url}>Go</button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}


export class CardContainer extends Component {

    constructor(props) {
        super(props);

        this.onChangePage = this.onChangePage.bind(this);

        this.state = {
            trails: this.props.trails,
            pageOfItems: []
        }
    }

    componentWillReceiveProps(props){
        this.setState({trails:props.trails})
    }

    onChangePage(pageOfItems){
        this.setState({pageOfItems})
    }

    render() {
        console.log("results ", this.props.trails);
        console.log('trails', this.state.trails)

        if(this.props.trails[1] === undefined){
            return <h2> Loading </h2>;
        }
        
        return (
            <div className="hike-results card-container">
                <div className='row'>
                    {this.state.pageOfItems.map((hike) => {
                        return <HikeCard key={hike.name} name={hike.name} desc={hike.summary}
                            img={hike.imgSmall} location={hike.location}
                            length={hike.length} difficulty={hike.difficulty}
                            url={hike.url} stars={hike.stars} />
                    })}
                    {console.log(this.state.trails, this.state.pageOfItems)}
                </div>
                <div className='pagination-holder'>
                    <JwPagination items={this.state.trails} onChangePage={this.onChangePage}/>
                </div>
            </div>
        );
    }


}