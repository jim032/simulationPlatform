import comHeader from '@/components-teach/sheader';
import {visitCourse,courseDatail} from '@/API/api-teach'
export default{
	 data(){
	 	return{
	 		 menuText:'Enlightenment - Blockchain Development History',
	 		 timeIndex: 0,
	 		 menuShow:false,//上方菜单按钮是否显示
	 		 courseId:1,
	 		 
        timeLineList: [{
              timestamp: 'November, 2008',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              icon: 'el-iconprev',
              year: 'November, 2008',
              info: 'Nakamoto releases bitcoin white paper',
              detailInfo:'In November 2008, Ben Cong published his paper bitcoin: a peer-to-peer e-cash system, which proposed the data structure of blockchain.'
            }, {
              timestamp: 'May, 2010',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: 'May, 2010',
              info: 'Rorida programmer buys pizza with 10000 bitcoin',
              detailInfo:'In May 2010, Florida programmer Laszlo hanyecz bought $25 worth of pizza with 10000 bitcoin, completing the first physical transaction in the history of bitcoin.'
            }, {
              timestamp: 'November, 2013',
              color: '#fff',
              fontsize: 24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: 'November, 2013',
              info: 'Ethereum project launched',
              detailInfo:'Vitalik buterin launched Ethereum project in November 2013 and released the first version of Ethereum white paper in December, which indicates that blockchain has entered the era of 2.0.'
            }, {
              timestamp: 'March, 2016',
              color: '#fff',
              fontsize: 24,
              year: 'March, 2016',
              size: '28',
              bgcolor: '#e4e7ed',
              info: 'Ethereum hard fork',
              detailInfo:'In March 2016, the famous Dao of Ethereum was attacked. Ethereum was hard bifurcated and the parallel of etc and eth appeared.'
            }, {
              timestamp: 'August, 2017',
              color: '#fff',
              fontsize: 24,
              size: '28',
              year: 'August, 2017',
              bgcolor: '#e4e7ed',
              info: 'Bitcoin hard bifurcation, bitcoin reached the highest price in the same year',
              detailInfo:'In August 2017, bitcoin hard bifurcated and BCH was born; In December, bitcoin reached its highest price ever, close to $20000.'
            }, {
              timestamp: 'October, 2019',
              color: '#fff',
              fontsize:24,
              size: '28',
              bgcolor: '#e4e7ed',
              year: 'October, 2019',
              info: 'China blockchain technology has risen to the height of national strategy',
              detailInfo:'On October 24, 2019, the Political Bureau of the CPC Central Committee held a blockchain learning conference, which focused on upgrading the development of blockchain technology to a national strategic level.'
            }],
            category_id:'',//访问课程的id
            title:'',//总title
	 	}
	 },
	 components:{
	 	comHeader
	 },
	  mounted(){
	  	let that = this;
		 	that.menuText = this.$route.params.pname+'-'+this.$route.params.name
		 	that.category_id = this.$route.params.id
		 	that.getvisit();
		 	that.getDataList();
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
       },
       getDataList(){
	    	courseDatail().then(res=>{
	    		var data2 = [];
	    		let obj = res.data	
					let name = this.$route.params.name
					let pname = this.$route.params.pname
				  if(obj){
					   this.timeLineList = obj[pname][name].content
					   this.title = obj[pname][name].title
			  	}
	    	 
	    	})
	    }
       
    }
}