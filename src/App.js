import React, { Component } from 'react';
import './style.css';

class App extends Component {
    render() {
        return (
            <div className='home'>
                <header aria-label="contains the navbar of the page">
                <h1>This is the hiking project</h1>
                </header>
                <main aria-label="contains the main content of the page">
                </main>
                <footer aria-label="This is the contact info">
                </footer>
            </div>
        )
    }
}

export default App;