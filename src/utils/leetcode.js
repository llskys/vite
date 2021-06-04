/*
 * @Author: your name
 * @Date: 2021-06-04 10:33:49
 * @LastEditTime: 2021-06-04 11:57:47
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