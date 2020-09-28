import comHeader from '@/components-teach/sheader';
import {visitCourse} from '@/API/api-teach'
export default{
	 data(){
	 	return{
	 		 menuText:'启蒙篇-区块链发展史',
	 		 timeIndex: 0,
	 		 menuShow:false,//上方菜单按钮是否显示
	 		 courseId:1,
	 		 
        timeLineList: [{
              timestamp: '2008年11月',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              icon: 'el-iconprev',
              year: '2008年11月',
              info: '中本聪发布《比特币白皮书》',
              detailInfo:'2008年11月中本聪发表论文《比特币：一种点对点的电子现金系统》，提出了BlockChain这种数据结构。'
            }, {
              timestamp: '2010年5月',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2010年5月',
              info: '弗罗里达程序员用一万比特币购买披萨',
              detailInfo:'2010年5月佛罗里达程序员Laszlo Hanyecz用一万比特币购买了价值25美元的披萨，完成了比特币历史上的第一笔实物交易。'
            }, {
              timestamp: '2013年11月',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2013年11月',
              info: '以太坊项目发起',
              detailInfo:'2013年11月 Vitalik Buterin发起Ethereum项目，并在12月发布了以太坊白皮书的首个版本，预示区块链进入2.0时代。'
            }, {
              timestamp: '2016年3月',
              color: '#fff',
              fontsize: 24,
              year: '2016年3月',
              size: '28',
              bgcolor: '#e4e7ed',
              info: '以太坊硬分叉',
              detailInfo:'2016年3月 以太坊著名的The DAO被攻击事件发生，以太坊硬分叉，出现了ETC和ETH并行。'
            }, {
              timestamp: '2017年8月',
              color: '#fff',
              fontsize: 24,
              size: '28',
              year: '2017年8月',
              bgcolor: '#e4e7ed',
              info: '比特币硬分叉，同年比特币达到最高价',
              detailInfo:'2017年8月，比特币发生硬分叉，BCH诞生；12月，比特币价格达到有史以来最高价，接近20000美元。'
            }, {
              timestamp: '2019年10月',
              color: '#fff',
              fontsize:24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2019年10月',
              info: '我国将区块链技术上升到国家战略高度',
              detailInfo:'2019年10月24日，中共中央政治局召开区块链学习会议，重点强调要将发展区块链技术上升到了国家战略高度。'
            }],
            category_id:''//访问课程的id
	 	}
	 },
	 components:{
	 	comHeader
	 },
	  mounted(){
	  	let that = this;
		 	that.menuText = '启蒙篇-'+this.$route.params.name
		 	that.category_id = this.$route.params.id
		 	that.getvisit();
		},
	  methods: {
        changeActive(index) {
            this.timeIndex = index;
        },
        //点击菜单图标
			  clickMenu(){
			 	  this.menuShow = !this.menuShow
			  },
			  
			  getvisit(){  
				  let that = this
				  let obj = {}
				  obj.user_id = sessionStorage.getItem('stu_userId');
				  obj.category_id = that.category_id
				  visitCourse(obj).then(res=>{
	          if(res.code==200){   
	          }else{
	          	 that.$toast(res.message,3000)
	          }
	        })
        }
       
    }
}