import axios from 'axios'
import Cookies from 'js-cookie'

import store from '@/store/store'
import router from '@/router/index'
//自定义配置新建一个axios实例
const http = axios.create({
	//baseURL: 'http://47.96.19.10:8282',
  //baseURL: 'http://192.168.1.52:8282',liu
	//baseURL: 'http://192.168.1.167:8080',//统
	baseURL:'http://47.96.19.10:8282',

	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	},
	timeout: 50000
})

//添加请求拦截器
http.interceptors.request.use(function(config) {

	if(config.method=='delete'){
		config.headers['Content-Type']='application/json'
	}

	let role_id = sessionStorage.getItem('role_id')
  
  let stu_role_id = sessionStorage.getItem('stu_role_id')
  
	if(role_id!=null && (role_id==1 ||　role_id==2)){
		config.headers.Authorization = Cookies.get('jwt')
	}

	if(stu_role_id!=null && stu_role_id==3) {
		config.headers.Authorization = Cookies.get('stu_jwt')
	}

	//对响应数据做点什么
	return config;

}, )

//添加响应拦截器
http.interceptors.response.use(function(response) {

	if (response.data.code == 400 || response.data.message == 'jwt is valid') { 
      router.push({
        path: "/login",
        querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
      })
    }
	return response.data;
}, function(error) {
	return Promise.reject(error)
})

export default http;

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
