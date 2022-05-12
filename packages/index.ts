
import NgFormDesign from './form/src/form-design'
import NgFormBuild from './form/src/form-build'
import { App } from 'vue'

function install (app) {

  app.component('ng-form-design', NgFormDesign)
  app.component('ng-form-build', NgFormBuild)
}

export {
  NgFormBuild,
  NgFormDesign
}

export default {
  install
}
