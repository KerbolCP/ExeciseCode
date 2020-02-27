import React, { Component } from 'react'
import { Prompt } from 'react-router-dom';

class Page6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inVal: ""
    }
  }
  changeVal(e) {
    this.setState({
      inVal: e.target.value
    })
  }
  addHandle() {

  }
  render() {
    return (
      <div>
        <Prompt
          when={this.state.inVal === "" ? false : true}
          message="输入的内容还未保存，确定要离开吗？" />
        <input type="text" placeholder="..." onChange={this.changeVal.bind(this)} />
        <h1>0</h1>
        <button onClick={this.addHandle.bind(this)}>add</button>
      </div>
    )
  }
}
export default Page6