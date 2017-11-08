import React, { Component } from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'

import Loadable from 'react-loadable';
import Loading from './components/Loading'


const Home = Loadable({loader: () => import('./pages/home/home'),loading:Loading});
const One = Loadable({loader: () => import('./pages/home/one'),loading:Loading});
const Two = Loadable({loader: () => import('./pages/home/two'),loading:Loading});
const User = Loadable({loader: () => import('./pages/user/user'),loading:Loading});

export default class App extends Component {
    render() {
        return (
            <Router> 
                <div>
                    <ul className="nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/one">One</Link></li>
                        <li><Link to="/two">Two</Link></li>
                        <li><Link to="/user">User</Link></li>
                    </ul>
                    <Route path="/" exact component={Home}/>
                    <Route path="/one" component={One}/>
                    <Route path="/two" component={Two} />
                    <Route path="/user" component={User} />
                </div>
            </Router>
        )
    }  
} 

