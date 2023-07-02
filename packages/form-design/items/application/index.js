// import { scanDirectoryJs }  from '../../../utils/index.js'

// // 扫描下面目录中所有的index.js 然后穷举后返回 
// const files = import.meta.globEager('./*/index.js')

// const files2 = scanDirectoryJs('./state')

 let list = [] 

// for(let key in files) {
// 	const config = files[key].default;
//   	list = list.concat(config)
// }

import state from './state/index.js'

list.push(state)
 
// 按照seq排序
list = list.sort(function(a,b){
  return a.seq - b.seq
})


export default {
  type: 'application',
  name: '应用组件',
  icon: 'icon-tradingdata',
  list: list 
}