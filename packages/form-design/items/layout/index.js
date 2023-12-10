import { t , $t } from '../../../locale/index.js' 
 
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
  name: $t('ngform.item.layout'),//'布局组件',
  icon: 'icon-tradingdata',
  list: list 
}