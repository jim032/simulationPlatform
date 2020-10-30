import axios from './http'
import qs from 'qs'

//创建token
var createToken = function (data) {
	return axios.post('/createToken', getJson(data))
}

//用户登录
var login = function (data) {
	return axios.post('/login', getJson(data))
}

//用户退出登录
var logout = function (data) {

	return axios.post('/logout', getJson(data))
}
//用户密码修改
var updateUser = function(data){
	return axios.post('/updateUser', getJson(data))
}

//用户在线人数
var online = function(data){
  return axios.post('/online', getJson(data))
}

//在线用户列表
var onlineUsers = function(data){
  return axios.post('/online_users', getJson(data))
}

//获取服务器硬件信息
var hardware = function(data){
  return axios.get('/hardware', getJson(data))
}

//课程访问频率
var courseFrequency = function(data){
	//console.log(data)
  return axios.get('/get_visit_course_frequency?per_page='+data.per_page+'&page='+data.page+'&start='+data.dateRangeStart+'&end='+data.dateRangeEnd+'&category_name='+data.category_name)
}



//查询学生信息
var search_user = function(data){
	return axios.get('/search_user?per_page='+data.per_page+'&page='+data.page+'&search='+data.search)
}

//获取凭证jwt
var jwt = function(data){
	return axios.post('/api.v1/session', data,{headers: {'Content-Type':'application/json'}})
}


//用户信息修改
var modify_user =function(data){
	return axios.post('/modify_user',data,{headers: {'Content-Type':'application/json'}})
}
//删除用户
var delete_user =function(params){
	return axios.delete('/delete_user',{data:params})
}


/*查询知识点列表*/
var categoryTree =function(data){
	return axios.get('/category_tree?type=0')
}


//用户重置密码
var updateUserPassword =function(data){
  return axios.post('/update_userPassword',data,{headers: {'Content-Type':'application/json'}})
}

/*添加课程*/
var addCourse =function(data){
  return axios.post('/add_course',data,{headers: {'Content-Type':'application/json'}})
}

/*查询课程*/
var course =function(data){
  return axios.get('/course?per_page='+data.per_page+'&page='+data.page+'&type='+data.type)
}

/*修改课程名称*/
var modifyCourseName =function(data){
  return axios.post('/modify_course_name',data,{headers: {'Content-Type':'application/json'}})
}

/*删除课程*/
var deleteCourse =function(params){
  return axios.delete('/delete_course',{data:params})
}

/*查询班级*/
var classes =function(params){
  return axios.get('/classes',{data:params})
}

/*绑定班级*/
var bindCourseClasses =function(data){
  return axios.post('/bind_course_classes',data,{headers: {'Content-Type':'application/json'}})
}

/*查询专业列表查询*/
var search_classes =function(data){
	return axios.get('/search_classes?department='+data.department+'&major='+data.major+'&grade_name='+data.grade_name)
}


export{
	login,updateUser,createToken,online,onlineUsers,hardware,courseFrequency,search_user,jwt,modify_user,
	delete_user,categoryTree,logout,updateUserPassword,addCourse,course,modifyCourseName,deleteCourse,classes,
  bindCourseClasses,search_classes
}

function getJson (data) {
	return qs.stringify(data)
}

