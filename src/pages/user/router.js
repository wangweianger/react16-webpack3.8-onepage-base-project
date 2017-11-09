// @flow
import asyncComponent from 'components/AsyncComponent';

const User = asyncComponent(() => import("./user"));

module.exports = [
    { 
        path: '/user',
        exact: true,
        component: User
    },
]
