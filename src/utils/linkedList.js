/*
 * @Author: your name
 * @Date: 2021-05-18 15:57:11
 * @LastEditTime: 2021-05-18 15:58:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\utils\linkedList.js
 */
// 节点类
class Node {
    constructor(element) {
        this.element = element; // element表示结点
        this.next = undefined; // next指向他的下一个结点(null表示是最后一个结点)
    }
}

// 链表类
export default class LinkedList {
    constructor() {
        this.head = null; // 为null表示默认情况下链表是一个空链表
        this.count = 0; // 记录链表中结点的个数
    }
    // 尾部插入方法
    push(element) {
        const node = new Node(element); // 创建一个新节点
        if (this.head == null) { // 如果是空链表，则插入的节点为头结点
            this.head = node;
        } else {
            let current = this.head; // 否则，从头结点开始找，根据next值是否为null找到最后一个节点，将最后一个节点的next指向新插入的节点
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++; // 节点个数+1
    }
    // 移除指定位置的元素
    removeAt(index) {
        if (index >= 0 && index < this.count) { // 下标不越界的情况下
            let current = this.head; // 从头结点开始
            if (index === 0) { // 删的是第一个，则将该节点指向的下个节点设为头节点
                this.head = current.next;
            } else {
                let previous; // 要删除的节点的前一个节点
                for (let i = 0; i < index; i++) { // 找到要删除的节点
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next; // 前一个节点的next指向当前节点的next，即可删除指定位置的节点
            }
            this.count--; // 节点个数-1
            return current.element; // 返回删除的节点元素
        }
    }
    // 返回指定索引的元素
    getElementAt(index) {
        if (index >= 0 && index <= this.count) { // 下标不越界的情况下
            let current = this.head;
            for (let i = 0; i < index; i++) { // 找到返回的节点
                current = current.next;
            }
            return current; // 返回该节点
        }
        return undefined; // 未找到的情况
    }
    // 在指定位置插入元素
    insert(element, index) {
        if (index >= 0 && index <= this.count) { // 下标不越界的情况下
            const node = new Node(element); // 生成节点
            if (index === 0) { // 如果是在头部插入，将新节点的next设为当前头结点，然后将头结点设为新生成的节点
                let current = this.head;
                node.next = current;
                this.head = node;
            } else {
                let previous;
                for (let i = 0; i < index; i++) { // 找到下标对应的节点
                    previous = current;
                }
                const current = previous.next; // 下标对应节点的下一个
                node.next = current; // 将新插入的节点的next设为下标对应节点的下一个
                previous.next = node; // 下标对应节点的next设为插入节点，完成插入
            }
            this.count++; // 节点个数+1
            return true;
        }
        return false; // 下标越界，插入失败
    }
    // 返回指定元素的下标
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) { // 从头节点开始找匹配的节点，返回对应下标
            if (element === current.element) {
                return i;
            }
            current = current.next;
        }
        return -1; // 不存在返回-1
    }
    // 删除指定元素
    remove(element) {
        let current = this.head;
        let previous;
        for (let i = 0; i < this.count && current != null; i++) {
            if (element === current.element) { // 从头节点开始找匹配的节点，将匹配到的节点的next设为前一个节点的next
                previous.next = current.next;
                this.count--;
                return true;
            }
            previous = current; // 未匹配到就将当前节点设为前一个节点
            current = current.next; // 当前节点设为下一个节点
        }
        return false;
    }
    // 返回链表长度
    size() {
        return this.count;
    }
    // 判断是否为空链表
    isEmpty() {
        return this.size() === 0;
    }
    // 返回头结点
    getHead() {
        return this.head;
    }
    // 返回拼接好的链表内容字符串
    toString() {
        // 空链表返回空字符串
        if (this.head == null) {
            return '';
        }
        // 逐个拼接
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString}->${current.element}`;
            current = current.next;
        }
        // 返回结果
        return objString;
    }
}