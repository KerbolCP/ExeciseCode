import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch }
  from "react-router-dom";


const MenuLink = ({ to, label }) => {
  return (
    <Route
      path={to}
      children={({ match }) => {
        console.log(match);

        return (
          <div>
            {/* children 无条件跳转，可以用to = 外部的path匹配，这时才有match */}
            <Link to={to}>{match ? "->" : ""}{label}</Link>
          </div>
        )
      }}
    />
  )
}

export default class Page5 extends Component {
  render() {
    return (
      <div>
        <h1>Page5</h1>
        <Router>
          <MenuLink to={this.props.match.path + "/com1"} label="com1"></MenuLink>
          <MenuLink to={this.props.match.path + "/com2"} label="com2"></MenuLink>
        </Router>
        <Switch>
          <Route />
        </Switch>
      </div>
    )
  }
}
