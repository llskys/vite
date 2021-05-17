/*
 * @Author: your name
 * @Date: 2021-05-17 16:05:02
 * @LastEditTime: 2021-05-17 16:05:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\customTable\drag\dragContent.js
 */
import React from 'react';
import { Icon } from 'antd';
import style from '../index.less';

export default function DragContent(props) {
  const { text, hideDelete, onClick = () => {}, style: styleObj } = props;
  return (
    <div className={style.dragContent} style={styleObj}>
      <span className={style.dragContentSpan}>
        <Icon type='unordered-list' />
        <a className={style.textStyle} style={styleObj}>
          {text}
        </a>
      </span>
      {!hideDelete && (
        <Icon type='close' style={{ cursor: 'pointer', paddingTop: 5 }} onClick={() => onClick()} />
      )}
    </div>
  );
}
