import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import AdminLoginPage from './components/AdminLoginPage/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import BookingPage from './components/BookingPage/BookingPage';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js/dist/popper';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { HashRouter, Route } from 'react-router-dom';
import DescriptionPage from './components/DescriptionPage/DescriptionPage';
import SeatPicker from './components/SeatPicker/SeatPicker';


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Route exact path="/" component={HomePage} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/api/movie/:mId" component={DescriptionPage} />
      <Route path="/auth/login" component={ AdminLoginPage } />
      <Route exact path="/admin/dashboard" component={AdminDashboard} />

    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
