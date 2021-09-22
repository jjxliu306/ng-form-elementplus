import { createApp } from 'vue'
import App from './App.vue'

// 导入element-ui    
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' 

 // 导入组件库
import  FormDesign from '../packages/index' 
//Vue.use(FormDesign)



//Vue.use(ElementUI);
const app = createApp(App)
 

app.use(ElementPlus) 
app.use(FormDesign) 

app.mount('#app')
