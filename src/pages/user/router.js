// @flow
import asyncComponent from 'components/AsyncComponent'

module.exports = [
    { 
        path: '/user',
        component: asyncComponent(() => import('./user'))
    },
]
