/*
 * @Author: your name
 * @Date: 2021-05-18 15:11:48
 * @LastEditTime: 2021-05-24 09:54:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\event\event.js
 */
import React, { useState, useEffect } from 'react'

const delay = id => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(`finish${id}`)
        }, id%2===0? 500: 2000)
    })
}

function RaceConditions() {
    const [id, setId] = useState(0)
    
    useEffect(()=>{
        // 解决因为入参发生变化导致多次请求，并且处理了请求顺序异常的问题
        let didCancel = false
        delay(id).then(data=>{
            if (!didCancel) {
                console.log(data);
            }
        });
        return ()=>{
            didCancel = true
        }
    },[id])
    
    return (
        <button onClick={()=>setId(c=>c+1)}>test</button>
    )
  }
  
  export default RaceConditions
