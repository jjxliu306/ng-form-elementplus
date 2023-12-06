import { t , $t } from './index';
import { cloneDeepAndFormat } from '../utils/index.js'
 
 
export default {
  methods: {
    cloneDeepAndFormat,
    $t,
    t(...args) {
      return t.apply(this, args);
    },
    getLabel(v) { 
      console.log("v" , v , (typeof v=='function'))
      if(typeof v == 'function') {
          const label = v()
          console.log('label' , label)
          return label 
      } 
      return v
    }
  }
};


