/*
 * @Author: your name
 * @Date: 2021-05-17 16:03:00
 * @LastEditTime: 2021-05-17 16:03:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\customTable\table.js
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Button, Table, Icon, Modal, Checkbox, Tooltip } from 'antd';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { DragItem, DragContent, DragContainer } from './drag';
import locales from './locale';
import style from './index.less';

export default function TableContent(props) {
  const { locale, id, columns, alwaysShow, showList, onColumnChange, mode, style: styleObj } = props;
  const newlocales = {...locales, ...locale};
  const unique = [];
  // columnConfigObj:对象形式的全部column   keyList:存放的全部column的key   renderColumns:最终渲染使用的column配置  fixList:禁止拖拽的列，取columns中设置了fixed属性的列  fixLeft,fixRight:对象形式记录fixed的顺序
  const [columnConfigObj, keyList, renderColumns, fixList, fixLeft, fixRight] = [{}, [], [], [], {}, {}];
  let initialChecked = null;
  columns.forEach((item, index) => {
    keyList.push(item.key);
    columnConfigObj[item.key] = item;
    if (item.fixed) {
      fixList.push(item.key);
      if (item.fixed === 'left') {
        fixLeft[item.key] = `left${index}`
      } else {
        fixRight[item.key] = `right${index}`
      }
    }
    // 初次进入，全选
    if (showList === 'all') {
      renderColumns.push(item);
      initialChecked = 'all';
    }
  });
  // 保存过，按序设置需要展示的column
  if (showList !== 'all') {
    initialChecked = [];
    // 合并去重当前选中和禁止取消的key
    unique.push(...[...new Set([...showList, ...alwaysShow])]);
    unique.forEach(item => {
      renderColumns.push(columnConfigObj[item]);
      initialChecked.push(item);
    });
  }
  const [visible, setVisible] = useState(false);
  const [showArray, setArr] = useState(showList === 'all' ? keyList : unique);

  useEffect(() => {
    setArr(showList === 'all' ? keyList : unique);
  }, [keyList.join(',')]);

  // 保存
  const save = () => {
    setVisible(false);
    if (onColumnChange) {
      const hideArray = keyList.filter(item => !showArray.includes(item));
      const result = [];
      showArray.forEach(item => {
        result.push(columnConfigObj[item]);
      });
      onColumnChange({ showArray, hideArray, result });
    }
  };

  // 取消
  const cancel = (flag = true) => {
    setArr(initialChecked === 'all' ? keyList : initialChecked);
    if (flag) {
      setVisible(false);
    }
  };

  // 更新已选的顺序
  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const Item = showArray[dragIndex];
      setArr(
        update(showArray, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, Item]]
        })
      );
    },
    [showArray]
  );

  // 左侧勾选
  const onChange = keysAfterChange => {
    const array = [];
    // 分别过滤出不固定和固定列的key
    const normalKeys = keysAfterChange.filter(item => !fixList.includes(item));
    const fixLeftKeys = keysAfterChange.filter(item => columnConfigObj[item].fixed === 'left');
    const fixRightKeys = keysAfterChange.filter(item => columnConfigObj[item].fixed === 'right');
    normalKeys.forEach(item => {
      array.push(item)
    });
    fixLeftKeys.sort(function(a, b) {
      return parseInt(fixLeft[a].split('left')[1]) - parseInt(fixLeft[b].split('left')[1])
    }).reverse().forEach(item => {
      array.unshift(item)
    })
    fixRightKeys.sort(function(a, b) {
      return parseInt(fixRight[a].split('right')[1]) - parseInt(fixRight[b].split('right')[1])
    }).forEach(item => {
      array.push(item)
    })
    setArr(array);
  };

  // 右侧取消展示
  const cancelShow = key => {
    const set = new Set(showArray);
    set.delete(key);
    setArr([...set]);
  };

  const renderCont = data => {
    if (mode === 'table' && data.length > 0) {
      return <Table {...{ ...props, columns: data }} />;
    }
    return null;
  };

  const newlocalesMap = newlocales[window.g_lang] || newlocales['en-US']

  return (
    <div className={style.tableWrap}>
      <div className={style.dropWrap} id={id} style={styleObj}>
        <Button type='primary' onClick={() => setVisible(true)}>
          <Icon type='filter' theme='filled' />
        </Button>
      </div>
      <Modal
        getContainer={() => document.getElementById(id)}
        bodyStyle={{ height: 400, padding: 0 }}
        width={800}
        onCancel={() => cancel()}
        onOk={() => save()}
        visible={visible}
        centered
        title={newlocalesMap.modalTitle}
      >
        <Row>
          <Col span={16} className={style.leftColStyle}>
            <div className={style.titleStyle}>{newlocalesMap.leftTitle}</div>
            <Checkbox.Group style={{ width: '100%' }} value={showArray} onChange={onChange}>
              <Row>
                {columns.map(item => (
                  <Col span={6} key={item.key} style={{ padding: '5px 0' }}>
                    <Checkbox value={item.key} disabled={alwaysShow.includes(item.key)}>
                      <Tooltip title={item.titleFormat || item.title}>
                        <span>{item.titleFormat || item.title}</span>
                      </Tooltip>
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Col>
          <Col span={8} style={{ padding: 15 }}>
            <div className={style.titleStyle}>
              <span>{newlocalesMap.rightTitle}</span>
              <a style={{ cursor: 'auto' }}>({newlocalesMap.sort})</a>
              <a style={{ float: 'right' }} onClick={() => cancel(false)}>
                {newlocalesMap.revert}
              </a>
            </div>
            <DragContainer>
              {showArray.map((item, index) => {
                if (!fixList.includes(item)) {
                  return (
                    <DragItem key={item} id={item} moveItem={moveItem} index={index}>
                      <DragContent
                        hideDelete={alwaysShow.includes(item)}
                        text={columnConfigObj[item] ? (columnConfigObj[item].titleFormat || columnConfigObj[item].title) : ''}
                        key={item}
                        onClick={() => cancelShow(item)}
                      />
                    </DragItem>
                  );
                }
                return (
                  <DragContent
                    style={{ cursor: 'not-allowed' }}
                    hideDelete={alwaysShow.includes(item)}
                    text={columnConfigObj[item] ? (columnConfigObj[item].titleFormat || columnConfigObj[item].title) : ''}
                    key={item}
                    onClick={() => cancelShow(item)}
                  />
                );
              })}
            </DragContainer>
          </Col>
        </Row>
      </Modal>
      {renderCont(renderColumns)}
    </div>
  );
}

TableContent.propTypes = {
  /**
   * table的id,Modal挂载的id
   */
  id: PropTypes.string,
  /**
   * 除中英文之外的国际化
   */
  locale: PropTypes.object,
  /**
   * 配置按钮的样式
   */
  style: PropTypes.object,
  /**
   * antd table的column配置项
   */
  columns: PropTypes.array,
  /**
   * 禁止取消展示的key list
   */
  alwaysShow: PropTypes.array,
  /**
   * 选中列的key list,初次进入请设为'all'
   */
  showList: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /**
   * 保存的回调事件
   */
  onColumnChange: PropTypes.func
};

TableContent.defaultProps = {
  id: 'default',
  locale: {},
  style: {},
  columns: [],
  alwaysShow: [],
  showList: 'all',
  onColumnChange: () => {}
};
