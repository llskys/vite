/*
 * @Author: your name
 * @Date: 2021-03-22 16:41:26
 * @LastEditTime: 2021-03-22 16:41:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\my-app\src\demo\treeshaking\example3.js
 */
// example.3.js
import { funcD } from './example2';
import funcA from './example1';

export const funcF = () => {
    funcD();
    funcA();
    console.log('funcF');
}

export const funcH = () => {
    console.log('funcH');
}
