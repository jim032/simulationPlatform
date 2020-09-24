import axios from './http'
import qs from 'qs'
export{
	login,updateUser,createToken,online,onlineUsers,hardware,courseFrequency,search_user,jwt,modify_user,
	delete_user,course,logout,updateUserPassword
}

//用户重置密码
var updateUserPassword =function(data){
  return axios.post('/update_userPassword',data,{headers: {'Content-Type':'application/json'}})
}

function getJson (data) {
	return qs.stringify(data)
}
