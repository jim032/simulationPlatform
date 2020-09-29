import axios from './http'
import qs from 'qs'


//首页子目录
var categoryTree =function(data){
  return axios.get('/category_tree?type='+data.type+'&category_id='+data.category_id)
}

//首页父目录
var pcategoryTree =function(data){
  return axios.get('/category_tree?type='+data.type)
}

//课程访问
var visitCourse =function(data){
  return axios.post('/visit_course',data,{headers: {'Content-Type':'application/json'}})
}


function getJson (data) {
	return qs.stringify(data)
}
export{
	categoryTree,pcategoryTree,visitCourse
}
