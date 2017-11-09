import React, { Component } from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'

/*------------------------------react-loadable按需加载-------------------------------------------*/
// import Loadable from 'react-loadable';
// import Loading from './components/Loading'
// const Home = Loadable({loader: () => import('./pages/home/home'),loading:Loading});
// const One = Loadable({loader: () => import('./pages/home/one'),loading:Loading});
// const Two = Loadable({loader: () => import('./pages/home/two'),loading:Loading});
// const User = Loadable({loader: () => import('./pages/user/user'),loading:Loading});

/*------------------------------bundle-loader按需加载---------------------------------------------*/
// import Bundle from './components/Bundle'
// import loadHome from 'bundle-loader?lazy!./pages/home/home'
// import loadOne from 'bundle-loader?lazy!./pages/home/one'
// import loadTwo from 'bundle-loader?lazy!./pages/home/two'
// import loadUser from 'bundle-loader?lazy!./pages/user/user'

// const Home = (props) => (<Bundle load={loadHome}>{(Home) => <Home {...props}/>}</Bundle>)
// const One = (props) => (<Bundle load={loadOne}>{(One) => <One {...props}/>}</Bundle>)
// const Two = (props) => (<Bundle load={loadTwo}>{(Two) => <Two {...props}/>}</Bundle>)
// const User = (props) => (<Bundle load={loadUser}>{(User) => <User {...props}/>}</Bundle> )

/*-------------------------------import按需加载------------------------------------------------------*/
// import Bundle from './components/BundleImport'
// const Home = (props) => (<Bundle load={() => import('./pages/home/home')}>{(Chat) => <Chat {...props}/>}</Bundle>);
// const One = (props) => (<Bundle load={() => import('./pages/home/one')}>{(Chat) => <Chat {...props}/>}</Bundle>);
// const Two = (props) => (<Bundle load={() => import('./pages/home/two')}>{(Chat) => <Chat {...props}/>}</Bundle>);
// const User = (props) => (<Bundle load={() => import('./pages/user/user')}>{(Chat) => <Chat {...props}/>}</Bundle>);

/*--------------------------------Create an Async Componen按需加载-------------------------------------*/
import asyncComponent from './components/AsyncComponent';
const Home = asyncComponent(() => import("./pages/home/home"));
const One = asyncComponent(() => import("./pages/home/one"));
const Two = asyncComponent(() => import("./pages/home/two"));
const User = asyncComponent(() => import("./pages/user/user"));

// import { renderRoutes } from 'react-router-config'

// const routes =[
//     { 
//         path: '/',
//         exact: true,
//         component: Home,
//         routes:[
//             {
//                 path: '/home/one',
//                 component: One
//             },
//             {
//                 path: '/home/two',
//                 component: Two
//             }
//         ]
//     },
// ]

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
                    {/*{renderRoutes(routes)}*/}
                    <Route path="/" exact component={Home}/>
                    <Route path="/one" component={One}/>
                    <Route path="/two" component={Two} />
                    <Route path="/user" component={User} />
                </div>
            </Router>
        )
    }   
} 

