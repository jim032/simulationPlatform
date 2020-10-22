import comheader from '@/components/sheader';
import tree from '@/components/tree';
import {categoryTree, addCourse, course, modifyCourseName, deleteCourse, classes, bindCourseClasses} from '@/API/api'

export default {
  data() {
    return {
      pageNum: 3,
      curcourse: null,

      leftNavWidth: '125',//左边宽度
      leftwidth: '125',//左边父菜单宽度
      dialogVisible: false,//添加课程弹出框是否显示
      updatedialogVisible: false,//修改课程名称
      groupVisible: false,//分组弹出框
      mainWidth: 0,//右边的宽度
      currentPage: 1,
      totalCourse: '',   //课程总数
      per_page: 8,     //课程每页数

      menus: [], //菜单列表
      actId: '',

      personal: '', //单人模式
      multiplayer: '',//多人模式
      courseList: [],//type为1表示单人，type表示2表示双人
      teaClassList: [],
      teacurClass: '',//当前班级
      newClassName: '',//创建课程名称
      updateClassName: '',//修改课程名称
      newClassType: 1,//当前创建课程的模式，1代表单人模式，2代表多人模式(选择多人，单人的样式)
      errorMess: '',//创建课程提示框文字

      personal_menus: [],//单人菜单列表
      personal_id: '',
      multiplayer_menus: [], //多人菜单列表
      multiplayer_id: '',

      update_course_id: '',//修改课程名称id

      categories: [],
      numbers: '',
      courseIndex:null,
    }
  },
  components: {
    comheader, tree
  },
  watch: {
    mainWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        this.mainWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    },
    leftNavWidth(val) {
      let that = this
      that.mainWidth = that.$refs.courseMain.offsetWidth - that.leftNavWidth - 61
    }

  },

  methods: {

    //获取课程列表
    getCategory() {
      let that = this;
      categoryTree().then(res => {
        if (res.code == 200) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].id == "e72d3a24-f983-11ea-adc1-0242ac120002") {
              that.personal = "单人";
              that.personal_menus = res.data[j].children;
              that.personal_id = res.data[j].id;
            } else {
              that.multiplayer = "多人";
              if (res.data[j].children) {
                that.multiplayer_menus = res.data[j].children;
                that.multiplayer_id = res.data[j].id
              } else {
                that.multiplayer_menus = [];
                that.multiplayer_id = '';
              }

            }

          }
          that.menus = res.data[0].children;
          that.addShow(that.menus)
        } else {
          that.$toast(res.message, 3000)
        }
      })
    },


    /*当前页改变的时候触发*/
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let that = this;
      that.currentPage = val;
      that.getCourse();
    },
    //表格酒奇偶行显示不一样
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'odd-row';
      } else if (rowIndex % 2 === 0) {
        return 'even-row';
      }
    },
    //表头单元格的className的回调方法
    cellClass(row) {
      if (row.columnIndex == 0) {
        return 'ntab-checkbox';
      }

    },

    //课程选择
    chooseCourse(index, obj) {
      let that = this
      that.curcourse = index
      that.currentPage= 1

    },

    //创建课程
    createCourse() {
      this.dialogVisible = true
    },

    //修改课程名称
    modifyCourseName(obj,course_id) {
      this.update_course_id = course_id;
      this.updateClassName = obj.course_name;
  
      this.updatedialogVisible = true
    },

    sureUpdateCourseName() {
      let that = this
      if (this.updateClassName == '') {
        that.errorMess = '请输入课程名称'
        return;
      } else {
        let obj = {};
        obj.user_id = that.$store.state.userId || sessionStorage.getItem('user_id');
        obj.course_id = that.update_course_id;
        obj.course_name = that.updateClassName;
        modifyCourseName(JSON.stringify(obj)).then(res => {
          if (res.code == 200) {
            this.updatedialogVisible = false;
            this.getCourse();
          } else {
            that.$toast(res.message, 3000)
          }
        })

      }
    },

    //创建课程确认
    sureNewClass() {
      let that = this
      if (this.newClassName == '') {
        that.errorMess = '请输入课程名称'
        return;
      }else {
        let obj = {};
        obj.user_id = that.$store.state.userId || sessionStorage.getItem('user_id');
        obj.course_name = that.newClassName;
        obj.classes = [];
        obj.categories = that.categories;
        obj.type = that.newClassType;
        if (that.categories == "") {
          that.$toast("请勾选知识点", 3000)
          return;
        }
        addCourse(JSON.stringify(obj)).then(res => {
          if (res.code == 200) {
          	this.dialogVisible = false;
            this.getCourse();
          } else {
            that.$toast(res.message, 3000)
          }
        })

      }
    },

    //班级
    getClasses() {
      let that = this;
      classes().then(res => {
        if (res.code == 200) {
          that.teaClassList = res.data;
        } else {
          that.$toast(res.message, 3000)
        }
      })
    },

    //绑定班级人数
    changeClass(id, courseId) {
      let that = this;
      let obj = {};
      obj = that.teaClassList.find((item) => {
        return item.class_id === id;//筛选出匹配数据
      });
      let obj1 = {};
      obj1.user_id = that.$store.state.userId || sessionStorage.getItem('user_id');
      obj1.course_id = courseId;
      obj1.classes = [];
      obj1.classes.push(obj.class_id);
//   console.log(obj1.classes);
      bindCourseClasses(obj1).then(res => {
        if (res.code == 200) {
          classes().then(res1 => {
            if (res1.code == 200) {
              for (let i = 0; i < res1.data.length; i++) {
                if (res1.data[i].class_id == obj.class_id) {
                  that.numbers = res1.data[i].numbers;
                  that.getCourse();
                }
              }
            } else {
              that.$toast(res1.message, 3000)
            }
          })
        } else {
          that.$toast(res.message, 3000)
        }
      })
    },

    //查询课程列表
    getCourse() {
      let that = this;
      let obj = {};
      obj.per_page = that.per_page;
      obj.page = that.currentPage - 1;
      obj.type = that.newClassType;
      course(obj).then(res => {
        if (res.code == 200) {
          that.courseList = res.data.content;
          for (let i = 0; i < res.data.content.length; i++) {
            if (res.data.content[i].classes_list.length > 0) {
              let tmp = res.data.content[i].classes_list;
              that.courseList[i].numbers = tmp[0].numbers;
              that.courseList[i].class = tmp[0].class_name;
              // for (let j = 0; j < tmp.length; j++) {
              //   if (tmp[j] != null && tmp[j].length > 0) {
              //     that.courseList[i].numbers = tmp[j].numbers;
              //   }
              // }
            }
          }
          that.totalCourse = res.data.totalElements;
          that.dialogVisible = false
        } else {
          that.$toast(res.message, 3000)
        }
      })
    },

    //删除课程
    deleteCourse(course_id) {
      this.$confirm('是否确认删除课程?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        let obj = {};
        obj.user_id = that.$store.state.userId || sessionStorage.getItem('user_id');
        obj.course_id = course_id;
        deleteCourse(obj).then(res => {
          if (res.code == 200) {
//          console.log(obj.user_id);
            that.getCourse();
          } else {
            this.$toast(res.message, 2000)
          }
        })


      }).catch(() => {
      });
    },

    //创建课程单双人选择
    chooseType(num) {
      let that = this;
      that.newClassType = num
      that.leftNavWidth = 125;
      that.categories = [];
      that.menus = [];      
      if (num == 1) {
        that.menus = that.personal_menus;
      } else {
        that.menus = that.multiplayer_menus; 
      }
      that.courseIndex = 0;
      that.addShow(that.menus)
      this.getCourse();
   
    },

    addShow(arr) {
      for (var i = 0; i < arr.length; i++) {
        this.$set(arr[i], "show", false);
        this.$set(arr[i], "selectArr", []);
        if (arr[i].children && arr[i].children.length > 0) {
          this.addShow(arr[i].children)
        }
      }
    },
    //点击箭头使树展开收缩
    selectItem(data, index, level) {
    	
      let that = this
      that.courseIndex = 1;
      
      switch (parseInt(level)) {
        case 1://表示点击第一级
          if (data.show == true) {
            data.show = false;
            that.leftNavWidth = 125;
          } else {
            for (var i = 0; i < that.menus.length; i++) {
              if (i == index) {
                if (data.children.length > 0) {
                  //如果此项下有children且length大于0，则切换展开与折叠状态
                  data.show = true;
                  that.leftNavWidth = 350;
                } else {
                  //如果此项下没有children或length等于0，则将选中的id赋值给actId
                  that.leftNavWidth = 125;
                  data.show = true;
                }

              } else {
                that.$set(that.menus[i], "show", false);
              }
            }
          }
          break;
        case 2:
          if (data.children && data.children.length > 0) {
            data.show = !data.show;

          }
          break;

      }


    },
    //进行多选勾选
    checkItem(data) {
      if (data.selectArr.length > 0) {
        //如果这一项的selectArr有值，说明是被勾选状态，要把selectArr清空，清空勾选
        data.selectArr = [];
        //如果此选项清空勾选后，children，那么也同时要清空
        if (data.children && data.children.length > 0) {
          this.clearChild(data.children);
        }
        //如果此选项清空勾选后，要把所有的父元素，也全部清空勾选，因为它不勾选了，所有父元素的状态不可能还处于勾选状态，不管它勾选不勾选，我们都要清除一遍，以防万一
        this.clearFather(this.menus, data);

        if (this.categories.indexOf(data.id) != -1) {
          let index = this.categories.indexOf(data.id)
          this.categories.splice(index, 1)
        }


      } else {//如果这一项的selectArr为[]，说明是未被勾选状态，在selectArr里加id值，添加勾选
        data.selectArr.push(data.id);

        //如果此选项清空勾选后，如果下面有children的话，那么也同时勾选下面所有的孩子
        if (data.children && data.children.length > 0) {
          this.addChild(data.children);
        } else {
          this.categories.push(data.id);
        }
        //如果此选项勾选后，要判断所有的上级元素是不是应该全部打勾
        this.selectFather(this.menus, data);
      }

//    console.log(this.categories)

    },
    //定义函数清空所有孩子的勾选
    clearChild(arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].selectArr = [];

        if (this.categories.indexOf(arr[i].id) != -1) {
          let index = this.categories.indexOf(arr[i].id)
          this.categories.splice(index, 1)
        }

        if (arr[i].children && arr[i].children.length > 0) {
          this.clearChild(arr[i].children);
        }


      }

    },
    //定义函数添加所有孩子的勾选
    addChild(arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].selectArr.push(arr[i].id);

        if (arr[i].children && arr[i].children.length > 0) {
          this.addChild(arr[i].children);
        } else {
          this.categories.push(arr[i].id);
        }
      }

    },
    //定义函数一层一层的往上寻找父元素的children
    clearFather(father, data) {
      for (var i = 0; i < father.length; i++) {
        if (father[i].id == data.id) {
          //找到data所在的children为father，然后再通过这个children找到拥有这个children的父元素
          this.clearRealFather(this.menus, father);
        } else if (father[i].children && father[i].children.length > 0) {
          this.clearFather(father[i].children, data);
        }
      }
    },
    //定义函数根据找到的上层父元素的children来寻找父元素，并将他们清除勾选
    clearRealFather(menus, arr) {
      for (var i = 0; i < menus.length; i++) {
        if (menus[i].children == arr) {
          //找到这个拥有children的父元素后，将此selectArr清空
          menus[i].selectArr = [];
          //找到这个拥有children的父元素后，再调用clearFather，再进行向上寻找父元素，知道没有父元素为止
          this.clearFather(this.menus, menus[i]);
        } else if (menus[i].children && menus[i].children.length > 0) {
          this.clearRealFather(menus[i].children, arr);
        }
      }
    },
    //定义函数一层一层的往上寻找父元素的children
    selectFather(father, data) {
      for (var i = 0; i < father.length; i++) {

        if (father[i].id == data.id) {
          var arr = [];
          for (var j = 0; j < father.length; j++) {
            if (father[j].selectArr.length > 0) {
              arr.push(father[i]);
            }
          }
          //判断此数组中是不是所有的selectArr都有值，如果有值，就执行selectRealFather，将上层父元素也勾选
          if (arr.length == father.length) {
            //console.log(father)
            this.selectRealFather(this.menus, father);
          }
        } else if (father[i].children && father[i].children.length > 0) {
          this.selectFather(father[i].children, data);
        }
      }
    },
    //定义函数根据找到的上层父元素的children来寻找父元素，并将他们清除勾选
    selectRealFather(menus, arr) {
      //console.log(menus)
      for (var i = 0; i < menus.length; i++) {
        if (menus[i].children == arr) {
          //找到这个拥有children的父元素后，给selectArr赋值，使其勾选
          menus[i].selectArr.push(menus[i].id);
          //找到这个拥有children的父元素后，再调用selectFather，再进行向上寻找父元素，知道没有父元素为止
          this.selectFather(this.menus, menus[i]);

        } else if (menus[i].children && menus[i].children.length > 0) {
          this.selectRealFather(menus[i].children, arr);
        }
      }
    }


  },
  mounted() {
    let that = this;
    window.onresize = () => {
      return (() => {
        that.mainWidth = that.$refs.courseMain.offsetWidth - that.leftNavWidth - 61

      })()
    }
    that.$nextTick(function () {
      that.mainWidth = that.$refs.courseMain.offsetWidth - that.leftNavWidth - 61
    })

    //获取课程列表
    that.getCategory();
    that.getCourse();
    that.getClasses();


  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);

    }
  },
  destroyed() {
    window.onresize = null;
  }
}
