import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Footer.scss';
import mountain from './img/mountain.png';

export class Footer extends Component {
    render(){
        return(
            <footer aria-label="This is the contact info">
                    <div id="reference">
                        <div class="row">
                            <div class="col-sm-2">
                                <a>Data from:</a>
                            </div>
                            <div class="col-sm-3">
                                <a href="https://www.wta.org/go-outside/passes/passes-and-permit-info">Washington Trails
                        Association</a>
                            </div>
                            <div class="col-sm-3">
                                <a href="https://localadventurer.com/famous-hiking-trails-hardest-permits-us/">Local Advanturer</a>
                            </div>
                            <div class="col-sm-3">
                                <a href="https://www.fs.fed.us/">US Forest Service</a>
                            </div>
                        </div>
                        <p>
                            Made by Kyle, Harim and Anni
                            <img id="mountain" src={mountain} alt="the icon of mountains" />
                        </p>
                    </div>
                </footer>
        )
    }
}