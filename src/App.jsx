import React, { useState, useEffect } from 'react'
// import RecoilDemo from './recoil'
// import LifeCycleContainer from './react-demo/lifecycle'
// import Geti18n from './react-demo/geti18n'
// import PersonalInfoComponent from './react-demo/hookdemo'
// import SetState from './react-demo/setState'
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
      <button onClick={testMyPromise}>TEST</button>
    </>
  )
}

export default App
