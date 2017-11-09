// @flow
import asyncComponent from 'components/AsyncComponent';

const Home = asyncComponent(() => import("./home"));
const One = asyncComponent(() => import("./one"));
const Child = asyncComponent(() => import("./child"));
const Two = asyncComponent(() => import("./two"));


module.exports = [
    { 
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/one',
        component: One,
        routes: [
            { path: '/one/child',
                component: Child
            }
        ]
    },
    {
        path: '/two',
        component: Two,
    }

]
