/*
 * @Author: your name
 * @Date: 2021-05-17 16:04:53
 * @LastEditTime: 2021-05-17 16:04:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\customTable\drag\dragItem.js
 */
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export default function DragItem({ id, children, index, moveItem }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'item',
    canDrop: () => false,
    hover(item, monitor) {
      const temp = item;
      if (!ref.current) {
        return;
      }
      const dragIndex = temp.index;
      const hoverIndex = index;
      // 是自己就不移动
      if (dragIndex === hoverIndex) {
        return;
      }
      // 拖动元素距离可视口的高度
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // 拖动元素高度的一半
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // 鼠标点击处距离可视口的高度
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      // 更新拖动项最新的下标
      temp.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'item', id, index },
    collect: monitor => ({
      // 是否正在拖动
      isDragging: monitor.isDragging()
    })
  });
  // 判断当前拖动是否结束，实现预留空白的效果
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
}
