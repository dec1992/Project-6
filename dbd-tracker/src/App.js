
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import User from './components/User'
import NoID from './components/NoID'



import './App.scss'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/user/:steamId' component={User} />
      <Route exact path='/user/' component={NoID} />
    </Switch>
  </BrowserRouter>
)

export default App;
