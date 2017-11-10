// @flow
import asyncComponent from 'components/AsyncComponent'

module.exports = [
    { 
        path: '/user',
        exact: true,
        component: asyncComponent(() => import('./user'))
    },
]
