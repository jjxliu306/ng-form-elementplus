import { t , $t } from '../../../locale/index.js' 
 

let list = [] 
 

import state from './state/index.js'

list.push(state)
 
// 按照seq排序
list = list.sort(function(a,b){
  return a.seq - b.seq
})


export default {
  type: 'application',
  name: $t('ngform.item.application'),//'应用组件',
  icon: 'icon-tradingdata',
  list: list 
}