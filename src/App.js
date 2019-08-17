import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import themeFile from './utils/Theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Redux
import { Provider } from 'react-redux';
import store from './redux/Store';
import { SET_AUTHENTICATED } from './redux/Types';
import { loginUser, getUserData } from './redux/actions/UserActions';
// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './utils/AuthRoute';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    // authenticated = false;
    store.dispatch(loginUser())
    window.location.href = 'login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  } 
}

class App extends Component {
  render() { 
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
              <div className="container">
                <Navbar />
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <AuthRoute exact path="/login" component={Login}/>
                  <AuthRoute exact path="/signup" component={Signup}/>
                  <Route exact path="/users/:handle" component={User}/>
                  <Route exact path="/users/:handle/scream/:screamId" component={User}/>
                </Switch>
              </div>
            </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
 
export default App;