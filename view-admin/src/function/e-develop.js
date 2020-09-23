import comHeader from '@/components-teach/sheader';
export default{
	 data(){
	 	return{
	 		 menuText:'启蒙篇-区块链发展史',
	 		 timeIndex: 0,
	 		 menuShow:false,//上方菜单按钮是否显示
	 		 courseId:1,
	 		 
        timeLineList: [{
              timestamp: '1992',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              icon: 'el-iconprev',
              year: '1992',
              info: '“加密朋克”组织秘密成立'
            }, {
              timestamp: '2008年',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2008',
              info: '中本聪发布《比特币白皮书》'
            }, {
              timestamp: '2009年1月3日',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2009',
              info: '比特币世界的第一个区块被创建'
            }, {
              timestamp: '2013年10月',
              color: '#fff',
              fontsize: 24,
              year: '2013',
              size: '28',
              bgcolor: '#e4e7ed',
              info: '比特大陆成立'
            }, {
              timestamp: '2014年1月23日',
              color: '#fff',
              fontsize: 24,
              size: '28',
              year: '2014',
              bgcolor: '#e4e7ed',
              info: '以太坊项目开始启动'
            }, {
              timestamp: '2018年至今',
              color: '#fff',
              fontsize:24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2018',
              info: '大势所趋'
            }]
	 	}
	 },
	 components:{
	 	comHeader
	 },
	  methods: {
        changeActive(index) {
            this.timeIndex = index;
        },
        //点击菜单图标
			  clickMenu(){
			 	  this.menuShow = !this.menuShow
			  },
       
       
    }
}