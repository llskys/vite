/*
 * @Author: your name
 * @Date: 2021-05-17 15:58:55
 * @LastEditTime: 2021-05-17 16:01:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite-study\src\customTable\index.js
 */
import React, { Fragment } from 'react' 
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TableContent from './table'

function ColumnSettings(props){
    return (
        <Fragment>
            <DndProvider backend={HTML5Backend}>
                <TableContent {...{ ...props, mode: 'settings' }}/>
            </DndProvider>
        </Fragment>
    )
}

function CustomTable(props){
    return (
        <Fragment>
            <DndProvider backend={HTML5Backend}>
                <TableContent {...{ ...props, mode: 'table' }}/>
            </DndProvider>
        </Fragment>
    )
}

export { ColumnSettings, CustomTable }