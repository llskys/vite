/*
 * @Author: your name
 * @Date: 2021-05-14 09:54:27
 * @LastEditTime: 2021-05-14 10:14:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\utils\countDown.js
 */
const countDown = (time, step = 1) => {
    let timer;
    console.log(time)
    if(!time){
        return clearTimeout(timer)
    }
    if(!timer){
        timer = setTimeout(()=>{
            countDown(time - step, step)
        }, step*1000)
    }
}
countDown(100)