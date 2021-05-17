/*
 * @Author: your name
 * @Date: 2021-05-17 16:05:09
 * @LastEditTime: 2021-05-17 16:05:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\customTable\drag\dragContainer.js
 */
import React from 'react';
import { useDrop } from 'react-dnd';
import style from '../index.less';

export default function DragContainer(props) {
  const { children, containerName = '' } = props;
  const [, drop] = useDrop({
    accept: 'item',
    drop: () => ({ name: containerName })
  });
  return (
    <div ref={drop} className={style.dragContainer}>
      {children}
    </div>
  );
}
