import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './redux/index';
import {BrowserRouter as Router, Route, Redirect,Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './layout/dashboard/Dashboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import withAuth from './share/authenticate/withAuth';
import "@babel/polyfill";
import '../assets/style.css';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] as any });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const theme = createMuiTheme({
    typography: {
      fontSize: 12,
      fontFamily: 'byekan'
    },
    direction: 'rtl',
  });

const root = document.getElementById('root');

render(
    <Provider store={store}>
    <MuiThemeProvider theme={theme}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
    <Router>
        <Switch>
            <Route path="/signin" component={Login} />
            <Route path="/" component={withAuth(Dashboard)} />
        </Switch>
    </Router>
    </JssProvider>
    </MuiThemeProvider>
</Provider>, root);