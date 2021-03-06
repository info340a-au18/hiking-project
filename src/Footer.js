import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Footer.scss';
import mountain from './img/mountain.png';

export class Footer extends Component {
    render() {
        return (
            <footer aria-label="This is the contact info">
                <p>
                    Made by Kyle, Harim, Anni, Larissa, Kateka
                        <img id="mountain" src={mountain} alt="the icon of mountains" />
                </p>
                <div id="reference">
                    <cite>
                        <div className="row">
                            <div className="col-sm-2">
                                <a href="https://github.com/info340a-au18/project-kylegoodwin">Data from:</a>
                            </div>
                            <div className="col-sm-3">
                                <a href="https://www.wta.org/go-outside/passes/passes-and-permit-info">WTA</a>
                            </div>
                            <div className="col-sm-3">
                                <a href="https://hikingproject.org">Hiking project</a>
                            </div>
                            <div className="col-sm-3">
                                <a href="https://www.fs.fed.us/">US Forest Service</a>
                            </div>
                        </div>
                    </cite>

                </div>
            </footer>
        )
    }
}