/*
 * @Author: your name
 * @Date: 2021-05-18 15:11:48
 * @LastEditTime: 2021-05-27 09:44:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\event\event.js
 */
import React, { useState, memo } from 'react'

const Child1 = (props) => {
    console.log('我是子组件1')
    return(
        <div>我是子组件1</div>
    );
}

const isEqual = (prevProps, nextProps) => {
    console.log(prevProps);
    console.log(nextProps);
    return prevProps.count === nextProps.count
}
const Child2 = (props) => {
    console.log('我是子组件2')
    return(
        <div>我是子组件2</div>
    );
}

const ChildMemo = memo(Child2, isEqual)

function MemoTest() {
    const [count, setCount] = useState(0)
    return (
        <>
            <button onClick={()=>setCount(c=>c+1)}>{count}</button>
            <Child1/>
            <ChildMemo/>
        </>
    )
  }
  
  export default MemoTest
