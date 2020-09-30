import axios from 'axios'
import Cookies from 'js-cookie'

import store from '@/store/store'
import router from '@/router/index'
//自定义配置新建一个axios实例
const http = axios.create({
	baseURL: 'http://192.168.1.11:8088',
	//baseURL: 'http://192.168.1.52:8080',

	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	},
	timeout: 50000
})

//添加请求拦截器
http.interceptors.request.use(function(config) {
	/*
	if(config.method == 'get') {
		if(config.url.indexOf("?") != -1) {
			config.url += '&token=' + sessionStorage.getItem('userToken')
		} else {
			config.url += '?token=' + sessionStorage.getItem('userToken')
		}
	} else {
		if(config.data == '') {
			config.data += 'token=' + sessionStorage.getItem('userToken')
		} else {
			config.data += '&token=' + sessionStorage.getItem('userToken')
		}
	}
 */
	//console.log(config)
	//在发送请求之前做某事

	if(config.method=='delete'){
		config.headers['Content-Type']='application/json'
	}

	let role_id = sessionStorage.getItem('role_id')

	if(role_id!=null && (role_id==1 ||　role_id==2)){
		config.headers.Authorization = Cookies.get('jwt')
	}

	if(role_id!=null && role_id==3) {
		config.headers.Authorization = Cookies.get('stu_jwt')
	}

	//对响应数据做点什么\
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
