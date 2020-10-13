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
      path: '/teach/console',//控制台目录页
      name: 'console',
      component: () =>import('@/views-teach/catalogue/console'),
       meta:{
      	direction:1
      }
    },
    {
      path: '/teach/subCatalogue/:id/:name?',//首页菜单点击进去跳入子目录
      name: 'subCatalogue',
      component: () =>import('@/views-teach/catalogue/subCatalogue'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/customizeCatalogue',//首页菜单点击进去跳入子目录
      name: 'customizeCatalogue',
      component: () =>import('@/views-teach/catalogue/customizeCatalogue'),
      meta:{
      	direction:1
      }
    },
    
    {
      path: '/teach/dataStructure/:id/:name?',//节点模拟运行
      name: 'dataStructure',
      component: () =>import('@/views-teach/principle/p-dataStructure'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/nodeRun/:id/:name?',//节点模拟运行
      name: 'nodeRun',
      component: () =>import('@/views-teach/principle/p-nodeRun'),
      meta:{
      	direction:1
      }
    },
    
    {
      path: '/teach/smartContract/:id/:name?',//职能合约部署，发币过程
      name: 'smartContract',
      component: () =>import('@/views-teach/principle/p-smartContract'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/multipleSmartContract/:id/:name?',//职能合约部署，发币过程
      name: 'multipleSmartContract',
      component: () =>import('@/views-teach/principle/p-smartContract-multiple'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/hashAlgorithm/:id/:name?',//职能合约部署，hashAlgorithm
      name: 'hashAlgorithm',
      component: () =>import('@/views-teach/principle/p-hashAlgorithm'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/keyStore/:id/:name?',//职能合约部署，keyStore
      name: 'keyStore',
      component: () =>import('@/views-teach/principle/p-keyStore'),
      meta:{
      	direction:1
      }
    },
   
    {
      path: '/teach/ellipticCurveCryptography/:id/:name?',//椭圆线密码学
      name: 'ellipticCurveCryptography',
      component: () =>import('@/views-teach/principle/p-ellipticCurveCryptography'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/encryptionAlgorithm/:id/:name?',//对称加密算法
      name: 'encryptionAlgorithm',
      component: () =>import('@/views-teach/principle/p-encryptionAlgorithm'),
      meta:{
      	direction:1
      }
    }
    ,
    {
      path: '/teach/copyRight/:id/:name?',//场景篇-作品版权存证
      name: 'copyRight',
      component: () =>import('@/views-teach/scene/s-copyRight'),
      meta:{
      	direction:1
      }
    },
     {
      path: '/teach/logistics/:id/:name?',//场景篇-物流
      name: 'logistics',
      component: () =>import('@/views-teach/scene/s-logistics'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/publicWelfare/:id/:name?',//场景篇-物流
      name: 'publicWelfare',
      component: () =>import('@/views-teach/scene/s-publicWelfare'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/insurancePolicy/:id/:name?',//场景篇-快速保单处理
      name: 'insurancePolicy',
      component: () =>import('@/views-teach/scene/s-insurance'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/finance/:id/:name?',//场景篇-供应链金融审计
      name: 'finance',
      component: () =>import('@/views-teach/scene/s-finance'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/medicalCare/:id/:name?',//场景篇-病例信息共享
      name: 'medicalCare',
      component: () =>import('@/views-teach/scene/s-medicalCare'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/thesaurus/:id/:pname/:name?',//启蒙篇-名词库
      name: 'thesaurus',
      component: () =>import('@/views-teach/enlightenment/e-thesaurus'),
      meta:{
      	direction:1
      }
    },{
      path: '/teach/knowBlockchain/:id/:pname/:name?',//启蒙蒙-区块链分类
      name: 'knowBlockchain',
      component: () =>import('@/views-teach/enlightenment/e-knowBlockchain'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/develop/:id/:pname/:name?',//启蒙篇-发展史
      name: 'develop',
      component: () =>import('@/views-teach/enlightenment/e-develop'),
      meta:{
      	direction:1
      }
    },
    {
      path: '/teach/51attack/:id/:name?',//异常篇-51%攻击
      name: '51attack',
      component: () =>import('@/views-teach/abnormal/a-attack51'),
      meta:{
      	direction:1
      }
    },
   
    {
      path: '/teach/smartContractLoophole/:id/:name?',//异常篇-智能合约漏洞
      name: 'smartContractLoophole',
      component: () =>import('@/views-teach/abnormal/a-smart-contract-loophole'),
      meta:{
        direction:1
      }
    },
    {
      path: '/teach/malleabilityAttack/:id/:name?',//异常篇-延展性攻击
      name: 'malleabilityAttack',
      component: () =>import('@/views-teach/abnormal/a-malleability-attack'),
      meta:{
        direction:1
      }
    },
    {
      path: '/teach/replayAttack/:id/:name?',//异常篇-重放攻击
      name: 'replayAttack',
      component: () =>import('@/views-teach/abnormal/a-replay-attack'),
      meta:{
        direction:1
      }
    },
    {
      path: '/teach/longRangeAttack/:id/:name?',//异常篇-长程攻击
      name: 'longRangeAttack',
      component: () =>import('@/views-teach/abnormal/a-long-range-attack'),
      meta:{
        direction:1
      }
    },
    {
      path: '/teach/softHardFork/:id/:name?', //场景篇-软硬分叉
      name: 'softHardFork',
      component: () =>import('@/views-teach/abnormal/a-soft-hard-fork'),
      meta:{
        direction:1
      }
    }
    
  ]
})


