import React, { Component } from 'react'
import axios from 'axios'

export default class page2 extends Component {
  componentDidMount() {
    axios.get("https://www.baidu.com/getuser").then(res => {
      console.log(res);
    })
  }
  render() {
    return (
      <div>
        <h1>页面二</h1>
        <p>Username:{this.props.match.params.username}</p>
      </div>
    )
  }
}
