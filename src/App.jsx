import React, { useState, useEffect } from 'react'
// import RecoilDemo from './recoil'
import { ContextTest, Geti18n, LifeCycleContainer, PersonalInfoComponent, SetState, EventTest, RaceConditions, MemoTest } from './react-demo'
// import MyPromise from './utils/myPromise'
import { debounce, throttle, bigIntSum } from './utils/util' 

function App() {
  // const name = '1'
  // const obj = {
  //   name: 'name1',
  //   logName: ()=>{
  //     console.log('111',this.name)
  //   }
  // }
  // obj.logName()
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
      {/* <button onClick={()=>console.log(this)}>TEST</button> */}
      {/* <button onClick={debounce(obj.logName, 1000, obj)}>TEST1</button> */}
      {/* <ContextTest /> */}
      {/* <RaceConditions /> */}
      {/* <MemoTest /> */}
      {/* <button onClick={()=>console.log(bigIntSum('9007199254740992', '9007199254740992'))}>TEST</button> */}
    </>
  )
}

export default App
