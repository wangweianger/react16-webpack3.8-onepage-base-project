// @flow
import asyncComponent from 'components/AsyncComponent'

module.exports = [
    { 
        path: '/',
        exact: true,
        component: asyncComponent(() => import('./home'))
    },
    {
        path: '/one',
        component: asyncComponent(() => import('./one')),
        routes: [
            { path: '/one/child',
                component: asyncComponent(() => import('./child'))
            },
        ]
    },
    { path: '/other/:id',
        component: asyncComponent(() => import('./child'))
    },
    {
        path: '/two',
        component: asyncComponent(() => import('./two')),
    }

]
