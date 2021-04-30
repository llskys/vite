import React, { useState, useEffect } from 'react'
import RecoilDemo from './recoil'
// import LifeCycleContainer from './react-demo/lifecycle'
// import Geti18n from './react-demo/geti18n'
// import PersonalInfoComponent from './react-demo/hookdemo'
// import SetState from './react-demo/setState'
// import './App.css'

function App() {
  const [obj,setObj] = useState({ a:1})

  useEffect(()=>{
    console.log('222',obj);
    return ()=>{
      console.log('return');
    }
  },[])

  return (
    <>
      {/* <RecoilDemo /> */}
      {/* <Geti18n /> */}
      <button onClick={()=>{
        obj.b = 2
        console.log(obj);
        setObj({...obj,b:2})
      }}>11</button>
    </>
  )
}

export default App
