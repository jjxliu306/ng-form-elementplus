
// 扫描下面目录中所有的index.js 然后穷举后返回 
const files = import.meta.globEager('./*/index.js')

let list = [] 

for(let key in files) {
	const config = files[key].default;
  	list = list.concat(config)
}

 
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