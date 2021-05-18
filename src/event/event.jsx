/*
 * @Author: your name
 * @Date: 2021-05-18 15:11:48
 * @LastEditTime: 2021-05-18 15:56:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\event\event.js
 */
import React, { useEffect } from 'react'

function EventTest() {
    useEffect(()=>{
        const [box1,box2,box3] = [document.getElementById('box1'),document.getElementById('box2'),document.getElementById('box3')]        
        // box2.onclick = function () {
        //     console.log('box2');
        // }
        // box3.onclick = function () {
        //     console.log('box3');
        // }
        // box1.onclick = function () {
        //     console.log('box1');
        // }
        // box1.addEventListener('click', function(){
        //     console.log('box1 捕获阶段');
        // },true);
        // box2.addEventListener('click', function(){
        //     console.log('box2 捕获阶段');
        // },true);
        // box3.addEventListener('click', function(){
        //     console.log('box3 捕获阶段');
        // },true);
        box1.addEventListener('click', function(){
            console.log('box1 冒泡阶段');
        },false);
        box2.addEventListener('click', function(){
            console.log('box2 冒泡阶段');
        },false);
        box3.addEventListener('click', function(e){
            console.log('box3 冒泡阶段');
        },false);
    },[])
    
    return (
        <div id="box1">
            box1
            <div id="box2">
                box2
                <div id="box3">box3</div>
            </div>
        </div>
    )
  }
  
  export default EventTest
