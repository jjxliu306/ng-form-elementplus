
// 扫描下面目录中所有的index.js 然后穷举后返回 
// const files = import.meta.globEager('./**/index.js')

let list = [] 

// for(let key in files) {
// 	const config = files[key].default;
//   	list = list.concat(config)
// }

import batch from './batch/index.js'
import cascader from './cascader/index.js'
import checkbox from './checkbox/index.js'
import date from './date/index.js'
import datePicker from './datePicker/index.js'
import daterange from './daterange/index.js'
import input from './input/index.js'
import number from './number/index.js'
import radio from './radio/index.js'
import rate from './rate/index.js'
import select from './select/index.js'
import slider from './slider/index.js'
import switch_ from './switch/index.js'
import textarea from './textarea/index.js'
import uploadImg from './upload/image/index.js'
import uploadFile from './upload/file/index.js'

list.push(batch)
list.push(cascader)
list.push(checkbox)
list.push(date)
list.push(datePicker)
list.push(daterange)
list.push(input)
list.push(number)
list.push(radio)
list.push(rate)
list.push(select)
list.push(slider)
list.push(switch_)
list.push(textarea)
list.push(uploadImg)
list.push(uploadFile)

// 按照seq排序
list = list.sort(function(a,b){
  return a.seq - b.seq
})


export default {
  type: 'basic',
  name: '基础组件',
  icon: 'icon-tradingdata',
  list: list 
}