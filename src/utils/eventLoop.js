/*
 * @Author: your name
 * @Date: 2021-05-12 16:18:36
 * @LastEditTime: 2021-05-12 16:18:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\utils\eventLoop.js
 */
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
     console.log('async2');
	await async3()
	console.log(123)
}
async function async3() {
     console.log('async3');
	await async4()
	console.log(456)
}
async function async4() {
    await console.log('async4');
	console.log(789)
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');