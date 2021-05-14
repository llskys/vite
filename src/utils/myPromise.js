/*
 * @Author: your name
 * @Date: 2021-05-08 16:19:53
 * @LastEditTime: 2021-05-08 17:36:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\utils\util.js
 */

//PromiseA+规定的三种状态
const [PENDING,FULFILLED,REJECTED] = ['pending','fulfilled','rejected'] 

export default class MyPromise {
  // 构造方法接收一个回调
  constructor(executor) {
    this._status = PENDING     // Promise状态
    this._value = undefined    // 储存then回调return的值
    this._resolveQueue = []    // 成功队列, resolve时触发
    this._rejectQueue = []     // 失败队列, reject时触发

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    const _resolve = val => {
      //把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况
      const run = () => {
        if(this._status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = FULFILLED              // 变更状态
        this._value = val                     // 储存当前value

        // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
        // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行最后一次回调
        while(this._resolveQueue.length) {    
          const callback = this._resolveQueue.shift()
          callback(val)
        }
      }
      setTimeout(run)
    }
    // 实现同resolve
    const _reject = (val) => {
      const run = () => {
        if(this._status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = REJECTED               // 变更状态
        this._value = val                     // 储存当前value
        while(this._rejectQueue.length) {
          const callback = this._rejectQueue.shift()
          callback(val)
        }
      }
      setTimeout(run)
    }
    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject)
  }

  // then方法,接收一个成功的回调和一个失败的回调
  then(resolveFn, rejectFn) {
    // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
    typeof resolveFn !== 'function' ? resolveFn = value => value : null
    typeof rejectFn !== 'function' ? rejectFn = reason => {
      throw new Error(reason instanceof Error? reason.message:reason);
    } : null
  
    // return一个新的promise
    return new MyPromise((resolve, reject) => {
      // 把resolveFn重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
      const fulfilledFn = value => {
        try {
          // 执行第一个(当前的)Promise的成功回调,并获取返回值
          const x = resolveFn(value)
          // 分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
  
      // reject同理
      const rejectedFn  = error => {
        try {
          const x = rejectFn(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
  
      switch (this._status) {
        // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
        case PENDING:
          this._resolveQueue.push(fulfilledFn)
          this._rejectQueue.push(rejectedFn)
          break;
        // 当状态已经变为resolve/reject时,直接执行then回调
        case FULFILLED:
          fulfilledFn(this._value)    // this._value是上一个then回调return的值
          break;
        case REJECTED:
          rejectedFn(this._value)
          break;
      }
    })
  }

  //catch方法，返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同，其实就是执行一下then的第二个回调
  catch(rejectFn) {
    return this.then(undefined, rejectFn)
  }

  //finally方法，返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。在finally之后，还可以继续then。并且会将值原封不动的传递给后面的then
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),             //执行回调,并returnvalue传递给后面的then
      reason => MyPromise.resolve(callback()).then(() => { throw reason })  //reject同理
    )
  }

  //静态的resolve方法，返回一个以给定值解析后的Promise 对象。如果该值为promise，返回这个promise；如果这个值是thenable（即带有"then" 方法)），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平
  static resolve(value) {
    if(value instanceof MyPromise) return value //根据规范, 如果参数是Promise实例, 直接return这个实例
    return new MyPromise(resolve => resolve(value))
  }

  //静态的reject方法，返回一个带有拒绝原因的Promise对象
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  //静态的all方法，返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果
  static all(promiseArr) {
    let index = 0
    let result = []
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        //Promise.resolve(p)用于处理传入值不为Promise的情况
        MyPromise.resolve(p).then(
          val => {
            index++
            result[i] = val
            if(index === promiseArr.length) {
              resolve(result)
            }
          },
          err => {
            reject(err)
          }
        )
      })
    })
  }

  //静态的race方法，返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
      for (let p of promiseArr) {
        MyPromise.resolve(p).then(  //Promise.resolve(p)用于处理传入值不为Promise的情况
          value => {
            resolve(value)        //注意这个resolve是上边new MyPromise的
          },
          err => {
            reject(err)
          }
        )
      }
    })
  }
}
