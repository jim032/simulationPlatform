import axios from './http'
import qs from 'qs'


//首页目录
var categoryTree =function(data){
  return axios.get('/categoryTree?type='+data.type)
}

function getJson (data) {
	return qs.stringify(data)
}
export{
	categoryTree
}
