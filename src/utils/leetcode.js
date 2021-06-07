/*
 * @Author: your name
 * @Date: 2021-06-04 10:33:49
 * @LastEditTime: 2021-06-07 10:04:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\utils\leetcode.js
 */

/**
 * 存在重复元素
 * https://leetcode-cn.com/problems/contains-duplicate/
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => {
    const len = nums.length
    const map = new Map()
    let i = 0
    let flag = false
    while (!flag && i < len) {
        if (map.has(nums[i])) {
            flag = true
            break
        } else {
            map.set(nums[i], true)
            i++
        }
    }
    return flag
};

/**
 * 两数之和
 * https://leetcode-cn.com/problems/two-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    const len = nums.length
    const map = new Map()
    for (let i = 0; i < len; i++) {
        const diff = target - nums[i]
        if (map.has(diff)) {
            return [map.get(diff), i]
        }
        map.set(nums[i], i)
    }
};

/**
 * 找到插入位置
 * https://leetcode-cn.com/problems/search-insert-position/
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = (nums, target) => {
    const len = nums.length
    let i = 0
    let index = len
    while (i < len) {
        if (target <= nums[i]) {
            index = i
            break
        } else {
            i++
        }
    }
    return index
};

/**
 * 至少是其他数字两倍的最大数
 * https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/
 * @param {number[]} nums
 * @return {number}
 */
const dominantIndex = (nums) => {
    const len = nums.length
    if (!len) {
        return -1
    }
    let [max, max2, index, i] = [nums[0], null, 0, 0]
    for (let i = 1; i < len; i++) {
        const value = nums[i]
        if (value > max) {
            max2 = max
            max = value
            index = i
        } else if (value < max && value > max2) {
            max2 = value
        }
    }
    return max >= max2 * 2 ? index : -1
};

/**
 * 转换成小写字母
 * https://leetcode-cn.com/problems/to-lower-case/
 * @param {string} s
 * @return {string}
 */
const toLowerCase = str => {
    let s = ''
    for (let c of str) {
        // A - Z => 65 - 90
        s += c.charCodeAt() <= 90 && c.charCodeAt() >= 65 ? String.fromCharCode(c.charCodeAt() + 32) : c
    }
    return s
};

/**
 * 判断一个整数是不是回文数
 * https://leetcode-cn.com/problems/palindrome-number/
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = (x) => {
    const str = String(x)
    const len = str.length
    let flag = true
    const middle = len % 2 === 0 ? len / 2 : Math.floor(len / 2)
    let i = 0
    while ((len % 2 === 0 ? i <= middle : i < middle) && flag) {
        if (str[i] !== str[len - 1 - i]) {
            flag = false
        } else {
            i++
        }
    }
    return flag
};