import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Page1 from './views/Page1'
import Page2 from './views/Page2'
import Page3 from './views/Page3'
import Page5 from './views/Page5'
import Page6 from './views/Page6'

import { BrowserRouter as Router, Route, Link, Switch, Redirect }
  from "react-router-dom";

import { Provider } from "react-redux"
import store from './Store'
const MenuLink = (({ to, label }) => {
  return (<Route path={to} children={() => {
    return (
      <div>
        <Link to={to}>{label}</Link>
      </div>
    )
  }}>

  </Route>)

})

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Link to="/">page1</Link>|
        <Link to="/page2/小明">page2</Link>|
        <Link to="/page3/小刚">page3</Link>|
        <Link to="/page4/小刚">返回page1</Link>|
        <MenuLink to="/page5" label="page5"></MenuLink>|
        <Link to="/page6">page6</Link>
          <Switch>
            {/* exact 完全匹配 
              Switch 同一时刻只有一个页面能够渲染*/}
            <Route exact path="/" component={Page1}></Route>
            <Route path="/page2/:username" component={Page2}></Route>
            <Route path="/page3/:username" component={Page3}></Route>
            <Route path="/page4" render={() => {
              return (<Redirect to='/'></Redirect>)
            }}></Route>
            <Route exact path="/page5" component={Page5}></Route>
            <Route exact path="/page6" component={Page6}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
