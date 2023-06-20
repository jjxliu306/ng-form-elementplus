
// 扫描下面目录中所有的index.js 然后穷举后返回 
// const files = import.meta.globEager('./*/index.js')

// let list = [] 

// for(let key in files) {
// 	const config = files[key].default;
//   	list = list.concat(config)
// }

let list = []

import alert from './alert/index.js'
import divider from './divider/index.js'
import html from './html/index.js'
import text from './text/index.js'

list.push(alert)
list.push(divider)
list.push(html)
list.push(text)
 
// 按照seq排序
list = list.sort(function(a,b){
  return a.seq - b.seq
})


export default {
  type: 'decorate',
  name: '装饰组件',
  icon: 'icon-tradingdata',
  list: list 
}