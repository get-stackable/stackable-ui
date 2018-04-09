import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import theme from './utils/theme';
import apolloClient from './utils/apolloClient';
import registerServiceWorker from './utils/registerServiceWorker';

import Layout from './components/core/Layout';
// import Home from './pages/Home';
import HomePage from './pages/HomePage';
import Login from './pages/Login'


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
            pathname: "/login",
            state: { from: props.location }
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
        <Layout>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
        </Layout>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
