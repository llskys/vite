/*
 * @Author: your name
 * @Date: 2021-03-22 16:42:35
 * @LastEditTime: 2021-03-31 14:44:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\my-app\src\demo\treeshaking.js
 */
// main.js
import funcA from './treeshaking/example1';
import { funcG } from './treeshaking/example4';
import { funcB } from './treeshaking/example2';
import(/* webpackChunkName: "example3" */'./example3').then((module) => {
    console.log('123');
});
funcB();
