/*
 * @Author: your name
 * @Date: 2021-05-14 11:07:16
 * @LastEditTime: 2021-05-28 18:21:31
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

export function addWaterMark(url, text) {
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

/**
 * 打印方法
 */
export const printIframe = {
    create: (path = '') => {
        const url = path;
        // 判断iframe是否存在，不存在则创建iframe
        let iframe = document.getElementById('print-iframe');
        if (!iframe) {
            iframe = document.createElement('IFRAME');
            iframe.setAttribute('src', url);
            iframe.setAttribute('id', 'print-iframe');
            iframe.setAttribute(
                'style',
                'position:absolute;width:1800px;height:0px;left:-500px;top:-500px;'
            );
            document.body.appendChild(iframe);
            // iframe.contentWindow.focus();
        }
    },
    print: () => {
        const iframe = document.getElementById('print-iframe');
        if (iframe) {
            iframe.contentWindow.print();
        }
    },
    destroy: () => {
        const iframe = document.getElementById('print-iframe');
        if (iframe) {
            document.body.removeChild(iframe);
        }
    },
};

/**
 * 防抖
 */
export function debounce(fn, threshhold, scope) {
    if (!fn instanceof Function) {
        throw new TypeError('Expected a function')
    }
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        const context = scope || this
        timer = setTimeout(function () {
            fn.apply(context)
        }, threshhold)
    }
}

/**
 * 节流
 */
export const throttle = (fn, threshhold, scope) => {
    if (!fn instanceof Function) {
        throw new TypeError('Expected a function')
    }
    let lastTime = Date.now()
    return function () {
        const current = Date.now()
        const context = scope || this
        if (current - lastTime >= threshhold) {
            lastTime = current
            fn.apply(context)
        }
    }
}

export const throttle2 = (fn, threshold, scope) => {
    if (!fn instanceof Function) {
        throw new TypeError('Expected a function')
    }
    let timer;
    return function () {
        const context = scope || this
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context);
                timer = null;
            }, threshold)
        }
    }
}

export const bigIntSum = (str1, str2) => {
    if(typeof str1 !=='string' || typeof str2 !=='string'){
        throw new TypeError('params must be a string')
    }
    const result = []
    let morethan10 = false
    const len1 = str1.length
    const len2 = str2.length
    if(len1>len2){
        str2 = str2.padStart(len1, '0')
    }else if(len1<len2){
        str1 = str1.padStart(len2, '0')
    }
    const [str1List, str2List] = [str1.split(''), str2.split('')]
    const loopLength = str1List.length
    for(let i = loopLength-1; i >=0 ; i--){
        const first = Number(str1List[i])
        const second = Number(str2List[i])
        let tempResult = first + second + Number(morethan10)
        morethan10 = tempResult>=10
        result.push(`${morethan10? tempResult-10 : tempResult}`)
    }
    if(morethan10){
        result.push('1')
    }
    return result.reverse().join('')
}