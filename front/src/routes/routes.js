import React, { lazy } from 'react'
import { HomeRedirect } from './RouteUtils'
import RouteController from './RouteController'
const Dashboard = lazy(() => import('../components/views/Dashboard'))
const Login = lazy(() => import('../components/views/Login'))
const Home = lazy(() => import('../components/views/Home'))
const CargueArchivo = lazy(() => import('../components/views/CargueArchivo'))
const VerResultado = lazy(() => import('../components/views/VerResultado'))

const routes = [
    {
        path: "/",
        exact: true,
        component: HomeRedirect
    },
    {
        path: "/login",
        exact: true,
        render: props => <Login {...props} />
    },
    {
        path: "/cargue",
        exact: true,
        render: props => <RouteController component={Home}   {...props} />,
        routes: [
            {
                path: "/cargue",
                exact: true,
                render: props => <RouteController component={CargueArchivo} {...props} />
            }]
    },
    {
        path: "/resultado",
        exact: true,
        render: props => <RouteController component={Home}   {...props} />,
        routes: [
            {
                path: "/resultado",
                exact: true,
                render: props => <RouteController component={VerResultado} {...props} />
            }]
    },
    {
        path: "/app",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/app",
                exact: true,
                render: props => <RouteController component={Dashboard} {...props} />
            }
           
        ]
    }
]

export default routes