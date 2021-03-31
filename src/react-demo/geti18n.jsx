/*
 * @Author: your name
 * @Date: 2021-03-02 10:55:19
 * @LastEditTime: 2021-03-02 10:58:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\my-app\src\demo\geti18n.js
 */
import React from 'react'
import * as zh from '../locales/zh-CN'
import * as en from '../locales/en-US'
// import * as id from '../locales/id-ID'
import XLSX from 'xlsx';
 
// 字符串转ArrayBuffer
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i= 0; i!== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
const sheet2blob =(sheet, sheetName)=> {
	sheetName = sheetName || 'sheet1';
	const workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	const wopts = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	};
	const wbout = XLSX.write(workbook, wopts);
	const blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	return blob;
}

const openDownloadDialog = (url, saveName) =>
{
	if(typeof url == 'object' && url instanceof Blob)
	{
		url = URL.createObjectURL(url); // 创建blob地址
	}
	const aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	let event;
	if(window.MouseEvent) event = new MouseEvent('click');
	else
	{
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
	aLink.dispatchEvent(event);
}

function Geti18n() {

  const handleClick = () => {
    const data = [
      ['编码', '中文', '英文', '印尼'],
    ];
    Object.keys(zh.default).map(code=>{
      return data.push([code, zh.default[code], en.default[code],null]);
    })
    const sheet = XLSX.utils.aoa_to_sheet(data);
    openDownloadDialog(sheet2blob(sheet), '国际化.xlsx');
  }
    return (
      <div className="pageIndex">
        <button onClick={handleClick}>导出</button>
      </div>
    )
  }

export default Geti18n
