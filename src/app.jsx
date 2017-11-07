import React, { Component } from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Home from './pages/home/home.jsx'
import One from './pages/home/one.jsx'
import Two from './pages/home/two.jsx'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Form</Link></li>
                        <li><Link to="/one">One</Link></li>
                        <li><Link to="/two">Two</Link></li>
                    </ul>
                    <Route path="/" exact component={Home}/>
                    <Route path="/one" component={One}/>
                    <Route path="/two" component={Two} />
                </div>
            </Router>
        )
    }  
} 

