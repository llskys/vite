import React, { useState, useEffect } from 'react'
// import RecoilDemo from './recoil'
import { ContextTest1, ContextTest2, ContextTest3, Geti18n, LifeCycleContainer, PersonalInfoComponent, SetState } from './react-demo'
// import './App.css'
import MyPromise from './utils/util'

function App() {
  const testMyPromise = () =>{
    const p1 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('result')
      }, 1000);
    })
    p1.then(res => console.log('111', res))
    // p1.then(res => console.log('222', res))
  }
  return (
    <>
      {/* <RecoilDemo /> */}
      {/* <Geti18n /> */}
      {/* <button onClick={testMyPromise}>TEST</button> */}
      <ContextTest1 />
      {/* <ContextTest2 /> */}
      {/* <ContextTest3 /> */}
    </>
  )
}

export default App
