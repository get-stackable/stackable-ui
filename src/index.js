import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './utils/apolloClient';
import registerServiceWorker from './utils/registerServiceWorker';
import './styles/main.scss';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import AppUpdate from './pages/AppUpdate';
import AppView from './pages/AppView';
import Containers from './pages/Containers';
import ContainerCreate from './pages/ContainerCreate';
import ItemCreate from './pages/ItemCreate';
import Test from './pages/test';

import './styles/main.css';

// For private routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

// TODO:
PrivateRoute.propTypes = {};

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <React.Fragment>
        {/* TODO: loggedIn redirect dashboard else login */}
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/stack/:id" component={AppView} />
        <PrivateRoute exact path="/stack/:id/manage" component={AppUpdate} />
        <PrivateRoute
          exact
          path="/stack/:id/containers"
          component={Containers}
        />
        <PrivateRoute
          exact
          path="/stack/:appId/container/create"
          component={ContainerCreate}
        />
        <PrivateRoute
          exact
          path="/stack/:appId/container/:id/update"
          component={ContainerCreate}
        />
        <PrivateRoute
          exact
          path="/stack/:appId/container/:containerId/item/create"
          component={ItemCreate}
        />
        <PrivateRoute
          exact
          path="/stack/:appId/container/:containerId/item/:id/update"
          component={ItemCreate}
        />
        {/* <Route exact path="/test" component={Test} /> */}
      </React.Fragment>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
