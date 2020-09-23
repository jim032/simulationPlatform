// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import $ from 'jquery'

import 'ie-placeholder'
import toastRegistry from './components/toast/index'
Vue.config.productionTip = false
Vue.use(toastRegistry)
Vue.use(ViewUI)

Vue.use(ElementUI)
import router from './router'


// 全局路由导航拦截
router.beforeEach((to, from, next) => {
	
  if (to.path === '/login') { // 如果是登录页面路径，就直接next()
    next()
  } else { 
  	// 其他页面路径
	  if(to.meta.direction==0){
	   	 let userId = sessionStorage.getItem('user_id') 
		   if (userId == null || userId == '') { 
		    next({ path: '/login' }) 
		   }else{
		   	next()
		   }
	  }else{
	  	/*
	  	let userId = sessionStorage.getItem('stu_userId') 
		   if (userId == null || userId == '') { 
		    next({ path: '/login' }) 
		   }else{
		   	next()
		   }
		   */
		  next()
	  }
  }
})


// 路由独享导航拦截
beforeEnter: (to, from, next) => {
  // 判断用户是否登录
  
  if(to.meta.direction==0){  
	  let userId = sessionStorage.getItem('user_id')
	  if (userId == null || userId == '') {
	    next({ path: '/login' })
	  } else {
	  	console.log(token);
	    next()
	  }
  }else{
  	/*
  	let userId = sessionStorage.getItem('stu_userId')
	  if (userId == null || userId == '') {
	    next({ path: '/login' })
	  } else {
	  	console.log(token);
	    next()
	  }*/
	 next();
  }
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


