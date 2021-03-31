/*
 * @Author: your name
 * @Date: 2021-03-08 15:38:00
 * @LastEditTime: 2021-03-08 16:29:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\my-app\src\demo\setState.js
 */
import React from "react";

export default class SetState extends React.Component{

  state = {
    count: 0
  }

  increment = () => {
    console.log('increment setState前的count', this.state.count)
    this.setState({
      count: this.state.count + 1
    });
    console.log('increment setState后的count', this.state.count)
  }

  triple = () => {
    console.log('triple setState前的count', this.state.count)
    this.setState({
      count: this.state.count + 1
    });
    this.setState({
      count: this.state.count + 2
    });
    this.setState({
      count: this.state.count + 3
    });
    console.log('triple setState后的count', this.state.count)
  }

  reduce = () => {
    setTimeout(() => {
      console.log('reduce setState前的count', this.state.count)
      this.setState({
        count: this.state.count - 1
      });
      console.log('reduce setState后的count', this.state.count)
    },0);

  }

  render(){
    return <div>
      <button onClick={this.increment}>点我增加</button>
      <button onClick={this.triple}>点我增加三倍</button>
      <button onClick={this.reduce}>点我减少</button>
    </div>
  }

}
