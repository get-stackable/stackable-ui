import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import theme from './utils/theme';
import apolloClient from './utils/apolloClient';
import registerServiceWorker from './utils/registerServiceWorker';
import './styles/main.scss';

// import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AppUpdate from './pages/AppUpdate';

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

const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <Router>
        <React.Fragment>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/app/:id" component={AppUpdate} />
        </React.Fragment>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
