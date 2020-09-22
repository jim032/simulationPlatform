import comHeader from '@/components-teach/sheader';
export default{
	 data(){
	 	return{
	 		 menuText:'启蒙篇-区块链发展史',
	 		 timeIndex: 2,
	 		 menuShow:false,//上方菜单按钮是否显示
	 		 courseId:1,
	 		 
        timeLineList: [{
              timestamp: '2012年',
              color: '#999',
              fontsize: 18,
              size: '28',
              bgcolor: '#e4e7ed',
              icon: 'el-iconprev',
              year: '2012',
              info: 'chengli'
            }, {
              timestamp: '2013年',
              color: '#999',
              fontsize: 18,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2013',
              info: '工作室更名为：西安拓美网络科技有限公司'
            }, {
              timestamp: '2014年',
              color: '#999',
              fontsize: 18,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2014',
              info: '工作室更名为：西安拓美网络科技有限公司'
            }, {
              timestamp: '2015年',
              color: '#999',
              fontsize: 18,
              year: '2015',
              size: '28',
              bgcolor: '#e4e7ed',
              info: '工作室更名为：西安拓美网络科技有限公司'
            }, {
              timestamp: '2016年',
              color: '#999',
              fontsize: 18,
              size: '28',
              year: '2016',
              bgcolor: '#e4e7ed',
              info: '工作室更名为：西安拓美网络科技有限公司'
            }, {
              timestamp: '2017年',
              color: '#999',
              fontsize: 18,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2017',
              info: '工作室更名为：西安拓美网络科技有限公司'
            }, {
              timestamp: '2018年',
              color: '#999',
              fontsize: 18,
              size: '28',
              bgcolor: '#e4e7ed',
              year: '2018',
              info: '工作室更名为：西安拓美网络科技有限公司'
            }, {
              timestamp: '2019年',
              color: '#999',
              fontsize: 18,
              year: '2019',
              bgcolor: '#e4e7ed',
              size: '28',
              info: '工作室更名为：西安拓美网络科技有限公司'
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
        moveLeft()  {
            let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
            let listNum = 0;
            if(marginLeft <= 10 && (marginLeft >= -650)){
                this.$refs.mytimeline.style.marginLeft = marginLeft - 220 + 'px';
            }
        },
        moveRight() {
            let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
            if(marginLeft < (-200)){
                this.$refs.mytimeline.style.marginLeft = marginLeft + 220 + 'px';
            }
        }
    }
}