import 'jquery-ui/ui/widgets/draggable';
	import 'jquery-ui/ui/widgets/droppable';
	import comHeader from '@/components-teach/sheader';
	import comFooter from '@/components-teach/footer';
	import rightTips from '@/components-teach/tips';
	import { mapState } from "vuex";
	import common from '@/function/common'//公用js
	import nodeCommon from '@/function/nodeRun'//节点模拟运行js
	import {visitCourse} from '@/API/api-teach';
	export default {
		data() {
			return {
				menuShow: false, //菜单是否展开
				showTool: false, //工具箱是否显示
				funNum: 0,//当前点击的操作按钮2表示出块，3表示广播
				mainheight: 0,
				//四个节点信息（左边遍历节点拖拽）
				pointInto: [{id: 1,text: '节点1'}, {id: 2,text: '节点2'}, {id: 3,text: '节点3'}, {id: 4,text: '节点4'}].reverse(),
				showPointNum: 0,
				isDrog: true,
				screenWidth: document.body.clientWidth,//当前屏幕尺寸
				pointList: [], //当前四个div的四个点的坐标
				isDrag: false, //当前元素是否拖拽到目标元素中

				pointLine: [], //划线坐标
				top: '',
				boxWidth: 0, //svg划线的宽度
				divInfo1: {statusList: [],prowidth: 0}, //每个div显示的内容
				divInfo2: {statusList: [],prowidth: 0},
				divInfo3: {statusList: [],prowidth: 0},
				divInfo4: {statusList: [],prowidth: 0},

				divnum: '', //直接放置进去的div
				d_timer1: null,
				lineList: [], //已经画好线的数组
				operaInfo: {mess: '当前无状态，请按右侧提示步骤完成下一步操作',infolist: []}, //底部传递的信息
				step:1, //当前页面进行的步骤
				confirShow: false, //弹出框是否显示
				pageName: 1, //当前页面名 1代表节点模拟，2代表发币
				nodeList: [], //当前启动的节点
				blockPro: 0, //点击出块之后的进度
				isBlcok: false, //是否显示进度
				winPoint: {}, //节点出快，难点计算，胜出节点信息，是一个对象
				winNum: 0,//获胜节点
				
				broadcast: false, //广播是否完成画线
				
				consoleShow:false,//头部控制台是否显示
				
				menuText:'节点共识模拟',
				broadcasting:true,
				category_id:''
			}
		},
		components: {
			comHeader,
			rightTips,
			comFooter
		},
		computed: {
			stepTips(){
				return this.$store.state.node_stepTips
			}
		},
		methods: {
			//知识点访问
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
			//点击菜单
			clickMenu() {
				this.menuShow = !this.menuShow
			},

			//左侧工具了点击
			poinfun(num) {
				let that = this;
				that.menuShow = false
				//num=2代表出块(节点计算)
				if(num == 2 && that.step == 2 && !that.isBlcok) {
					that.funNum = num
					that.operaInfo.mess = ''
					that.operaInfo.infolist = [];
					if(that.nodeList.length == 4 && that.step == 2) {
						that.isBlcok = true;
						let timer = setInterval(function() {
							that.blockPro++;
							if(that.blockPro == 100) {
								clearInterval(timer)
								let tmp = that.nodeList
								let index = Math.floor((Math.random() * tmp.length));
								that.winpoint = that.nodeList[index]
								that.operaInfo.mess = '节点难度计算已完成，节点' + that.winpoint.pointId + '胜出。';
								that.operaInfo.infolist.push('矿工地址：' + that.winpoint.address)
								that.operaInfo.infolist.push('矿工余额：' + that.winpoint.balance)
								that.winNum = that.winpoint.pointId
								if(that.winpoint.div == 1) {
									that.divInfo1.beat = true
									that.divInfo1.broadcast = true
								} else if(that.winpoint.div == 2) {
									that.divInfo2.beat = true
									that.divInfo2.broadcast = true
								} else if(that.winpoint.div == 3) {
									that.divInfo3.beat = true
									that.divInfo3.broadcast = true
								} else {
									that.divInfo4.beat = true
									that.divInfo4.broadcast = true
								}
								that.isBlcok = false
						   
						    clearTimeout(that.timer1);
								that.timer1 = setTimeout(function(){
										that.confirShow = true
									},500)
								that.top = that.top - 40;
							}
						},50)

					}
				} else if(num == 3 && that.step == 3 && !that.isBlcok) {
					that.funNum = num
					that.operaInfo.mess = ''
					that.operaInfo.infolist = [];
					if(that.nodeList.length == 4 && that.step == 3) {
						that.isBlcok = true;
						let timer = setInterval(function() {
							that.blockPro++;
							if(that.blockPro == 40){
								if(that.winpoint.div == 1) {
									that.divInfo1.balance = 10
									$(".pointBox").addClass('pointBox1')
									nodeCommon.broadCastLine(1,Math.round(that.$refs.pointBox .offsetWidth*0.95));
								} else if(that.winpoint.div == 2) {
									$(".pointBox").addClass('pointBox2')
									that.divInfo2.balance = 10
									nodeCommon.broadCastLine(2,Math.round(that.$refs.pointBox .offsetWidth*0.95));
								} else if(that.winpoint.div == 3) {
									$(".pointBox").addClass('pointBox3')
									that.divInfo3.balance = 10
									nodeCommon.broadCastLine(3,Math.round(that.$refs.pointBox .offsetWidth*0.95));
								} else {
									$(".pointBox").addClass('pointBox4')
									that.divInfo4.balance = 10
									nodeCommon.broadCastLine(4,Math.round(that.$refs.pointBox .offsetWidth*0.95));
								}
								  clearTimeout(that.timer1);
								
									that.broadcast = true;
								
								
							}
							
							if(that.blockPro == 100) {
								clearInterval(timer)
								let tmp = that.nodeList
								that.winNum = that.winpoint.pointId
								that.operaInfo.mess = '节点' + that.winpoint.pointId + '区块打包广播已完成并且节点' + that.winpoint.pointId + '获得了奖励。';
								that.winpoint.balance = 10
								that.operaInfo.infolist.push('矿工地址：' + that.winpoint.address)
								that.operaInfo.infolist.push('矿工余额：' + that.winpoint.balance)

						   clearTimeout(that.timer);
								that.isBlcok = false;
								
								that.timer1 = setTimeout(function(){
									//获胜div
									let winDiv = that.winpoint.div;
									that.broadcasting = false;
									switch(parseInt(winDiv)){
										case 1:
										  that.divInfo2.broadcast = true;
										  that.divInfo3.broadcast = true;
										  that.divInfo4.broadcast = true;
										  break;
										case 2:
										  that.divInfo1.broadcast = true;
										  that.divInfo3.broadcast = true;
										  that.divInfo4.broadcast = true;
										  break;
										case 3:
										  that.divInfo1.broadcast = true;
										  that.divInfo2.broadcast = true;
										  that.divInfo4.broadcast = true;
										  break;
										case 4:
										  that.divInfo1.broadcast = true;
										  that.divInfo2.broadcast = true;
										  that.divInfo3.broadcast = true;
										  break;
									}
								},700)
								
								that.timer1 = setTimeout(function(){
									that.confirShow = true;
								},1000)
								
								
								
							}
						},50)

					}
				}
			},

			//点击创世区块
			showBlock(num) {
				//num为1表示点击的是创世区块
				if(num == 1) {
					let that = this;
					that.operaInfo.infolist = [];
					that.operaInfo.mess = '创世区块';
					that.operaInfo.infolist.push('区块高度:' + '0')
					that.operaInfo.infolist.push('区块哈希:' + 'd46802ea8a7a8143e13e7cb59048f16d251b232f7077f1417c391b2c082ae19b')
					that.operaInfo.infolist.push('父区块哈希:' + '0000000000000000000000000000000000000000000000000000000000000000')
					that.operaInfo.infolist.push('梅克尔树根:' + '51dd5336762b8a52e44016bdec5acd790785623a5b070d66ff32d9c3eab0c79e')
				} else {
					let that = this;
					that.operaInfo.infolist = [];
					that.operaInfo.mess = '区块1';
					that.operaInfo.infolist.push('区块高度:' + '1')
					that.operaInfo.infolist.push('区块哈希:' + '9ee6329a8d9c1179a49e35839e8e6076aa40936a60435b63ef15e4e4ab65a19f')
					that.operaInfo.infolist.push('父区块哈希:' + 'd46802ea8a7a8143e13e7cb59048f16d251b232f7077f1417c391b2c082ae19b')
					that.operaInfo.infolist.push('梅克尔树根:' + '7e331e0490d94833201f84591ac1a1c1a9f747b6c4020e4c4ac5912e2fba6070')
				}
			},
			/*给节点区域设置高度*/
			initHeight() {
				let that = this;
				let height = this.$refs.header.$el.offsetHeight + 30; //
				let bottom = this.$refs.bottom.$el.offsetHeight; //100
				let mainh = window.innerHeight - height - bottom
				this.mainheight = mainh > 400 ? mainh : 400
				let pdiv = this.$refs.box_point.offsetTop
				this.top = (that.mainheight - 200) / 2 - 30

				/*相对于父元素开始移动位置坐标*/
				let startx = 0
				let starty = 0

				$(".droppoint").draggable({
					containment: '.pageWrap',
					addClasses: true,
					start: function(event, ui) {
						startx = ui.position.left - ui.offset.left
						starty = ui.offset.top - ui.position.top
						$(".info").addClass("usable");
						that.menuShow = false
						$(this).children(".n_ltips").css({'display':'none'})
					},
					stop: function(event, ui) {

						//临时存放数组和索引的距离
						let distanceArray = [];
						let id = $(this)[0].getAttribute("data-id")
						$(this).draggable({
							disabled: true,
						})
						//判断是否拖进了目标元素中
						if(that.isDrag) {
							that.isDrag = false;
							$(this).remove()
							that.nodeStart(id, that.divnum)
						} else {
							//未拖拽到目标元素中
							let array = that.pointList
							for(let j = 0, len = array.length; j < len; j++) {
								let distance = common.distance(ui.offset.left, ui.offset.top + 20, array[j].x, array[j].y)
								distanceArray.push({
									distance,
									point: {
										x: array[j].x,
										y: array[j].y
									},
									num: array[j].num,
									div: array[j].div
								})
							}

							//离他最近的坐标和索引
							let pointInfo = common.getMinIndex(distanceArray);
							let num = pointInfo.num
							let div = pointInfo.div
							switch(num) {
								case 1:
									$(this).animate({ left: pointInfo.point.x + 4, top: pointInfo.point.y - starty })
									break;
								case 2:
									$(this).animate({ left: pointInfo.point.x - 45, top: pointInfo.point.y - starty })
									break;
								case 3:
									$(this).animate({ left: pointInfo.point.x - 45, top: pointInfo.point.y - starty - 45 })
									break;
								case 4:
									$(this).animate({ left: pointInfo.point.x + 4, top: pointInfo.point.y - starty - 45 })
									break;
							}

							this.timer = setTimeout(() => { //设置延迟执行
								if(div == 1) {
									$(".info1").droppable({ 'disabled': true })
									$(this).remove()
								} else if(div == 2) {
									$(".info2").droppable({ 'disabled': true })
									$(this).remove()
								} else if(div == 3) {
									$(".info3").droppable({ 'disabled': true })
									$(this).remove()
								} else {
									$(".info4").droppable({ 'disabled': true })
									$(this).remove()
								}
                
                //节点启动
								that.nodeStart(id, div)
                
                let boxWidth = (that.$refs.pointBox.offsetWidth * 0.75).toFixed(2)
								nodeCommon.addPointLine(div,boxWidth,that.pointLine,that.lineList)
							}, 400);
							/*数据添加*/
							common.clear(pointInfo.div, that.pointList)

						}

					}

				});

				$(".info").droppable({
					accept: ".droppoint",
					drop: function(event, ui) {
						that.isDrag = true;
						$(this).droppable({
							'disabled': true
						})
						var num = event.target.dataset.div
						//清除已选中div的坐标
						common.clear(num, that.pointList)
						that.divnum = num;
						let boxWidth = (that.$refs.pointBox.offsetWidth * 0.75).toFixed(2)
						nodeCommon.addPointLine(num,boxWidth,that.pointLine,that.lineList)
					}
				})
			},

			//节点启动方法
			nodeStart(id, num) {
					let that = this
					let obj = {};
					switch(parseInt(num)) {
						case 1:
							obj = that.divInfo1;
							that.startSteps(obj,id,num)
							$(".info1 .p_progress").animate({ width: '100%' }, 7000, 'linear')
							break;
						case 2:
							obj = that.divInfo2;
							that.startSteps(obj,id,num)
							$(".info2 .p_progress").animate({ width: '100%' }, 7000, 'linear')
							break;
						case 3:
							obj = that.divInfo3;
							that.startSteps(obj,id,num)
							$(".info3 .p_progress").animate({ width: '100%' }, 7000, 'linear')
							break;
						case 4:
							obj = that.divInfo4;
							that.startSteps(obj,id,num)
							$(".info4 .p_progress").animate({ width: '100%' }, 7000, 'linear')
							break;
					}
				},
				startSteps(obj,id,num) {
					let that = this;
					obj.pointId = id;
					obj.pointText = '节点' + id;
					obj.prowidth = 1;
					obj.icon = require('../assets/teachImg/icon_wk.png');
					obj.statusList.push(that.$store.state.node_sta1)
					if(that.nodeList.length == 0) {
						that.operaInfo.mess = that.$store.state.node_start
					}

					let d_sec1 = 0
					let timer = setInterval(function() {
						d_sec1++;
						switch(parseInt(d_sec1)) {
							case 1:
								obj.statusList.push(that.$store.state.node_sta2)
								break;
							case 2:
								obj.statusList.push(that.$store.state.node_sta3)
								break;
							case 3:
								obj.statusList.push(that.$store.state.node_sta4)
								break;
							case 4:
								obj.statusList.push(that.$store.state.node_sta5)
								break;
							case 5:
								obj.statusList.push(that.$store.state.node_sta6)
								break;
							case 6:
								obj.statusList.push(that.$store.state.node_sta7)
								break;
							case 7:
								clearInterval(timer);
								obj.nodeStatus = that.$store.state.node_sta8
								obj.prowidth = 100
								obj.address = num==1?'6050758d80d291fb21474fbf0830c9852e6462f8':num==2?'acde4cef5ee607adf56ce582f89fe1050f8a478d':
								num==3?'f2c94fff78bdab1ff5078cddd3e62edab5b0e31f':'a0a2cf9e1ef6f4edc314fea2833a3400a3a6af12'
				      	obj.div = num
				      	obj.balance = 0
								that.nodeList.push(obj);
								if(that.nodeList.length == 4) {
									/*当前步骤表示四个节点都启动完成*/
									that.operaInfo.mess = that.$store.state.node_finsh
									clearTimeout(that.timer1);
									that.timer1 = setTimeout(function(){
										that.confirShow = true
									},500)
									
									that.operaInfo.infolist = [];

								} else if(that.nodeList.length == 1) {
									that.top = that.top - 40;
								}
								break;
						}
					}, 1000)
					
			},
			//点击弹出框我知道了方法
			tipSure() {
				let that = this
				that.confirShow = false;
				that.step = that.step + 1;
				that.isBlcok = false;
				that.blockPro = 0
			},

			//显示弹出框
			showConfirm() {
				let that = this;
				that.confirShow = true;
			},
			//点击节点弹出节点信息
			showPointInfo(id) {
        let obj = {};
				let that = this;
				switch(parseInt(id)) {
					case 1:  
					  obj = that.divInfo1;
						break;
					case 2:
						obj = that.divInfo2;
						break;
					case 3:
					  obj = that.divInfo3;
						break;
					case 4:
					  obj = that.divInfo4;						
						break;
				}				
				that.operaInfo.infolist = [];
				if(obj.prowidth == 0) {
					that.operaInfo.mess = that.$store.state.node_noStart

				} else if(obj.prowidth != 100) {
					that.operaInfo.mess = obj.pointText + that.$store.state.node_noFinsh
				} else {
					that.operaInfo.mess = obj.pointText
					that.operaInfo.infolist.push('矿工地址：' + obj.address)
					that.operaInfo.infolist.push('矿工余额：' + obj.balance)
				}
				
			},

			//计算那个拖拽接纳框的位置
			initPointInfo() {
				let that = this;
				let top = that.top
				let p1 = that.$refs.info1.getBoundingClientRect()
				let p2 = that.$refs.info2.getBoundingClientRect()
				let p3 = that.$refs.info3.getBoundingClientRect()
				let p4 = that.$refs.info4.getBoundingClientRect()
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //可放置四个div的四个点坐标
        that.pointList = common.initPointInfo(top,p1,p2,p3,p4,scrollTop,that.pointList);

			},
			

		},

		watch: {
			/*监听宽度，划线自适应*/
			'boxWidth': function(oldval, newval) {
				let that = this;
				let length = that.lineList.length;
				let wd = 0				
				let lines = '';//划线参数points
				let x1 = 2
				let x2 = (that.boxWidth * 0.33).toFixed(2)
				let x3 = (that.boxWidth * 0.6666).toFixed(2)
				let x4 = that.boxWidth - 2;
				
				if(length >= 1) {
					//已经画好线自适应
					nodeCommon.nodeLineAuto(x1,x2,x3,x4,that.pointLine,that.lineList,length)
					
		  	}
				if(that.step>=3){
					nodeCommon.broadAuto(that.winpoint.div,Math.round(that.$refs.pointBox .offsetWidth*0.95))
				}
				

			},
			screenWidth(val) {
				// 为了避免频繁触发resize函数导致页面卡顿，使用定时器
				if(!this.timer) {
					// 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
					this.screenWidth = val
					this.timer = true
					let that = this
					setTimeout(function() {
						that.timer = false
					}, 400)

				}
			},

		},

		mounted() {
			let that = this;
      this.menuText = '区块链密码学-'+this.$route.params.name
      that.category_id = this.$route.params.id;
	    that.getvisit();
			window.onresize = () => {
				return(() => {
					window.screenWidth = document.body.clientWidth
					that.screenWidth = window.screenWidth;
					that.initHeight();
					that.initPointInfo();
					that.boxWidth = (that.$refs.pointBox.offsetWidth * 0.75).toFixed(2);
	      
	        

				})()
			}

			this.$nextTick(() => {
				that.initHeight();
				that.initPointInfo();
				that.boxWidth = (that.$refs.pointBox.offsetWidth * 0.75).toFixed(2)
				
			})

			//无法查看f12
			/*
	window.onkeydown = function(e){
		if(e.keyCode == 123) return false;
	} 
	*/

		},
		//离开页面清除定时器
		beforeDestroy() {
			if(this.timer) {　　
				clearInterval(this.timer);

			}
			if(this.timer1) {　　
				clearTimeout(this.timer);
			}
			
		},
		destroyed() {
      window.onresize = null;
    }

	}
