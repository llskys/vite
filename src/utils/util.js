/*
 * @Author: your name
 * @Date: 2021-05-14 11:07:16
 * @LastEditTime: 2021-05-14 11:19:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\utils\util.js
 */
import React, {
    useEffect,
    useRef
} from 'react'
import CryptoJS from 'crypto-js'

/**
 * @description: 图片添加水印
 * @param {string,string}
 * @return {string}
 */
function getBase64(word) {
    const str = CryptoJS.enc.Utf8.parse(word)
    return CryptoJS.enc.Base64.stringify(str)
}

export default function addWaterMark(url, text) {
    //--要加水印的文本设为数组，按序传入需要展示的文字信息
    const arr = []
    if (text) {
        if (text.length > 20) {
            arr.push(...(text.replace(/(.{20})/g, '$1,').split(',')))
        } else {
            arr.push(text)
        }
    }

    let allMsg = '?x-oss-process=image/resize,w_800,h_800'
    let megFirst = '/watermark,type_d3F5LW1pY3JvaGVp,size_15,text_'
    let megLast = ',color_FFFFFF,size_10,shadow_50,t_100,g_se,x_10,y_'
    for (let i = 0; i < arr.length; i++) {
        const tempBase64 = getBase64(arr[i]).replace(/[+]/g, '-').replace(/\//g, '_')
        allMsg = `${allMsg}${megFirst}${tempBase64}${megLast}${10 + 20 * i}`
    }
    return url + allMsg
}

/**
 * @description: n等分为二维数组
 * @param {Array,number}
 * @return {Array}
 */
export function splitInNumber(data, n) {
    const result = []
    data.forEach((item, index) => {
        if (index % n === 0) {
            result.push([item])
        } else if (index % n !== 0) {
            result[result.length - 1].push(item)
        }
    })
    return result
}

/**
 * @description: 生成uuid
 * @return {string}
 */
export function uuidGenerate() {
    const s = []
    const hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i += 1) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        if ([8, 13, 18, 25].includes(i)) {
            s[i] = '-'
        }
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1)
    const uuid = s.join('')
    return uuid
}

/**
 * @description: hook里的定时器
 * @param {function,number}
 */
export function useInterval(callback, delay) {
    const savedCallback = useRef()

    // 保存新回调
    useEffect(() => {
        savedCallback.current = callback
    })

    // 建立 interval
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

/**
 * @description: 指定年月1号是星期几
 * @param {string} 年-月(YYYY-MM)
 * @return {number} 1-7
 */
export function firstDayInWeek(date) {
    return moment(`${date}-01`).weekday()
}

/**
 * @description: 指定日期所在自然周
 * @param {string} 年月日(YYYY-MM-DD)
 * @return {string[]}
 */
export function getWeekRange(date, formatRef = 'YYYY-MM-DD') {
    const weekStart = moment(date)
        .startOf('weeks')
        .add(1, 'day')
        .format(formatRef)
    const weekEnd = moment(date)
        .endOf('weeks')
        .add(1, 'day')
        .format(formatRef)
    return [weekStart, weekEnd]
}

/**
 * @description: 指定月总天数
 * @param {string} 年月日(YYYY-MM-DD|YYYY-MM)
 * @return {number} 1-31
 */
export function totalDayInMonth(date) {
    return moment(date).daysInMonth()
}

/**
 * @description: 秒数倒计时
 * @param {number, number} 
 */
export const countDown = (time, step = 1) => {
    let timer;
    console.log(time)
    if (!time) {
        return clearTimeout(timer)
    }
    if (!timer) {
        timer = setTimeout(() => {
            countDown(time - step, step)
        }, step * 1000)
    }
}