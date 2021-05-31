/*
 * @Author: your name
 * @Date: 2021-05-12 16:18:36
 * @LastEditTime: 2021-05-31 16:58:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\utils\eventLoop.js
 */
// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
// }
// async function async2() {
//     console.log('async2');
//     await async3()
//     console.log(123)
// }
// async function async3() {
//     console.log('async3');
//     await async4()
//     console.log(456)
// }
// async function async4() {
//     await console.log('async4');
//     console.log(789)
// }
// console.log('script start');
// setTimeout(function () {
//     console.log('setTimeout');
// }, 0)
// async1();
// new Promise(function (resolve) {
//     console.log('promise1');
//     resolve();
// }).then(function () {
//     console.log('promise2');
// });
// console.log('script end');

// script start
// async1 start
// async2
// async3
// async4
// promise1
// script end
// 789
// promise2
// 456
// 123
// async1 end
// setTimeout

// console.log(0)
// async function async1() {
//     const res = await async2()
//     console.log(res)
// }

// async function async2() {
//     console.log(1);
//     return Promise.resolve(2)
// }

// async1()

// setTimeout(function () {
//     console.log(3);
// }, 2000)

// Promise.resolve(4).then(function (res) {
//         console.log(res)
//         return 5
//     }).then(function (res) {
//         console.log(res);
//         return new Promise(resolve => setTimeout(function () {
//             resolve(6)
//         }))
//     })
//     .then(function (res) {
//         console.log(res)
//     })

// console.log(7);

// 0
// 1
// 7
// 4
// 5
// 2
// 6
// 3

// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
// }
// async function async2() {
//     console.log('async2');
// }

// console.log('script start');
// setTimeout(function () {
//     console.log('setTimeout');
// }, 0)
// async1();
// new Promise(function (resolve) {
//     console.log('promise1');
//     resolve();
// }).then(function () {
//     console.log('promise2');
// });
// console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// promise2
// async1 end
// setTimeout