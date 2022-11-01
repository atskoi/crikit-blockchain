import React from 'react'
import { Redirect } from 'react-router-dom'

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    {
        path: '/',
        exact: true,
        component: React.lazy(() => import('./pages/Home')),
    },
    {
        path: '/token/create',
        exact: true,
        component: React.lazy(() => import('./pages/CreateToken')),
    },
]

export default routes
