import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)



export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/index',
      meta:{
      	direction:0
      }
    },
    {
    	path: '/index',//数据统计
      name: 'index',
      component: () =>import('@/views/index/index'),
      meta:{
      	direction:0
      }
    },
    
    {
      path: '/login',//登陆页面
      name: 'login',
      component: () =>import('@/views/user/userLogin'),
    },
    
    {
      path: '/personManage',//人员管理-学生
      name: 'personManage',
      component: () =>import('@/views/personManage/pm-student'),
      meta:{
      	direction:0
      }
    },
    

    {
      path: '/course',
      name: 'course',
      component: () =>import('@/views/course/course'),
      meta:{
      	direction:0
      }
    },
    {
      path: '/perSet',//个人设置
      name: 'perSet',
      redirect:'/perSet/changePaw',
      component: () =>import('@/views/user/per-set'),
      children:[{
         path: '/perSet/changePaw',//个人设置
         name: 'changePaw',
         component: () =>import('@/views/user/set-changePaw'),
       },
       {
         path: '/perSet/function',//个人设置
         name: 'function',
         component: () =>import('@/views/user/set-function'),
        }
      ],
      meta:{
      	direction:0
      }
    },
    
    
    {
      path: '/teach',//首页菜单目录页
      name: 'catalogue',
      component: () =>import('@/views-teach/catalogue/catalogue'),
       meta:{
      	direction:1
      }
    },
    {
      path: '/subCatalogue/:id',//首页菜单点击进去跳入子目录
      name: 'subCatalogue',
      component: () =>import('@/views-teach/catalogue/subCatalogue'),
      meta:{
      	direction:1
      }
    },
    
    {
      path: '/teach/login',//登陆页面
      name: 'login',
      component: () =>import('@/views-teach/user/userLogin'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/dataStructure',//节点模拟运行
      name: 'dataStructure',
      component: () =>import('@/views-teach/principle/p-dataStructure'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/nodeRun',//节点模拟运行
      name: 'nodeRun',
      component: () =>import('@/views-teach/principle/p-nodeRun'),
      meta:{
      	direction:1
      }
    },
    
    {
      path: '/teach/smartContract',//职能合约部署，发币过程
      name: 'smartContract',
      component: () =>import('@/views-teach/principle/p-smartContract'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/hashAlgorithm',//职能合约部署，发币过程
      name: 'hashAlgorithm',
      component: () =>import('@/views-teach/principle/p-hashAlgorithm'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/keyStore',//职能合约部署，发币过程
      name: 'keyStore',
      component: () =>import('@/views-teach/principle/p-keyStore'),
      meta:{
      	direction:1
      }
    },
   
    {
      path: '/teach/ellipticCurveCryptography',//椭圆线密码学
      name: 'ellipticCurveCryptography',
      component: () =>import('@/views-teach/principle/p-ellipticCurveCryptography'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/encryptionAlgorithm',//对称加密算法
      name: 'encryptionAlgorithm',
      component: () =>import('@/views-teach/principle/p-encryptionAlgorithm'),
      meta:{
      	direction:1
      }
    }
    ,
    {
      path: '/teach/copyRight',//场景篇-作品版权存证
      name: 'copyRight',
      component: () =>import('@/views-teach/scene/s-copyRight'),
      meta:{
      	direction:1
      }
    },
     {
      path: '/teach/logistics',//场景篇-物流
      name: 'logistics',
      component: () =>import('@/views-teach/scene/s-logistics'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/publicWelfare',//场景篇-物流
      name: 'publicWelfare',
      component: () =>import('@/views-teach/scene/s-publicWelfare'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/insurancePolicy',//场景篇-快速保单处理
      name: 'insurancePolicy',
      component: () =>import('@/views-teach/scene/s-insurance'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/finance',//场景篇-供应链金融审计
      name: 'finance',
      component: () =>import('@/views-teach/scene/s-finance'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/medicalCare',//场景篇-病例信息共享
      name: 'medicalCare',
      component: () =>import('@/views-teach/scene/s-medicalCare'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/thesaurus',//场景篇-病例信息共享
      name: 'thesaurus',
      component: () =>import('@/views-teach/enlightenment/e-thesaurus'),
      meta:{
      	direction:1
      }
    },{
      path: '/teach/knowBlockchain',//场景篇-病例信息共享
      name: 'knowBlockchain',
      component: () =>import('@/views-teach/enlightenment/e-knowBlockchain'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/develop',//场景篇-病例信息共享
      name: 'develop',
      component: () =>import('@/views-teach/enlightenment/e-develop'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/51attack',//场景篇-病例信息共享
      name: '51attack',
      component: () =>import('@/views-teach/abnormal/a-attack51'),
      meta:{
      	direction:1
      }
    }
    
  ]
})


