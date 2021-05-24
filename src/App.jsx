import React, { useState, useEffect } from 'react'
// import RecoilDemo from './recoil'
// import { ContextTest, Geti18n, LifeCycleContainer, PersonalInfoComponent, SetState } from './react-demo'
// import EventTest from './event'
import RaceCondition from './RaceConditions'
// import MyPromise from './utils/myPromise'
// import { debounce, throttle } from './utils/util' 

function App() {
  // const obj = {
  //   name: 'name1',
  //   logName: function(){
  //     console.log('111',this)
  //   }
  // }
  // const testMyPromise = () =>{
  //   const p1 = new MyPromise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve('result')
  //     }, 1000);
  //   })
  //   p1.then(res => console.log('111', res))
  //   // p1.then(res => console.log('222', res))
  // }
  return (
    <>
      {/* <RecoilDemo /> */}
      {/* <Geti18n /> */}
      {/* <button onClick={throttle(obj.logName, 1000, obj)}>TEST</button>
      <button onClick={debounce(obj.logName, 1000, obj)}>TEST1</button> */}
      {/* <ContextTest /> */}
      <RaceCondition />
    </>
  )
}

export default App
