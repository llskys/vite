import React, { useState, useEffect } from 'react'
// import RecoilDemo from './recoil'
import { ContextTest, Geti18n, LifeCycleContainer, PersonalInfoComponent, SetState } from './react-demo'
// import './App.css'
import MyPromise from './utils/myPromise'

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
      <ContextTest />
    </>
  )
}

export default App
