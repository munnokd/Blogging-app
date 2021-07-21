import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter } from 'react-router-dom'
import Login from './ArticleList/Login'
import {CookiesProvider } from 'react-cookie'


ReactDOM.render(
  <>
  <CookiesProvider>
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/articles" component={App}/>
    </BrowserRouter>
  </CookiesProvider>
  </>,
  document.getElementById('root')
);

