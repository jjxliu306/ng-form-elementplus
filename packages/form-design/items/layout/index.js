
// 扫描下面目录中所有的index.js 然后穷举后返回 
// const files = import.meta.globEager('./*/index.js')

// let list = [] 

// for(let key in files) {
// 	const config = files[key].default;
//   	list = list.concat(config)
// }

let list = []

import controller from './controller/index.js'
import grid from './grid/index.js'
import table from './table/index.js'
import tabs from './tabs/index.js' 

list.push(controller)
list.push(grid)
list.push(table) 
list.push(tabs) 
 
// 按照seq排序
list = list.sort(function(a,b){
  return a.seq - b.seq
})


export default {
  type: 'layout',
  name: '布局组件',
  icon: 'icon-tradingdata',
  list: list 
}