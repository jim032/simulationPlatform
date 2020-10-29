
<template>
	<div class="pageWrap cour-pageWrap">
	    <comheader ref="header" :pageNum="pageNum"></comheader>
	    <div class="mainbox">
    		<div class="mmain course-main" ref="courseMain">
    			<div class="cou-left" :style="{'width':leftNavWidth+'px'}">

    				  <div class="coulist" :style="{'width':leftNavWidth+'px'}">
    				    <div class="typebox">
    				    	 <span :class="{'active':newClassType==1}" @click="chooseType(1)">单人</span>
    				    	 <span :class="{'active':newClassType==2}" @click="chooseType(2)">多人</span>
    				    </div>
    				     <tree :menus = "menus" :courseIndex="courseIndex"  @selectItem = "selectItem"  @checkItem = "checkItem"
    				     	:actId = "actId">
    				     </tree>
    				  </div>

    			</div>
    			<div class="courseMain" :style="{'width':mainWidth+'px'}">
    				<div class="right-main right-main-data">
    					 <!--当前没有课程列表显示的内容-->
    					 <div class="content" v-if="courseList.length==0">
	    					 <div class="form-add">
	    					 	 <div class="icon" @click="createCourse"></div>
	    					 	 <p class="mess"  @click="createCourse">创建课程</p>
	    					 </div>
    					 </div>
    					 <!--当前有课程-->
    					 <!--课程列表-->
    					 <div class="courseList" v-if="courseList.length>0">
    					 	   <ul class="ul-course">
    					 	   	 <li v-for="(item,index) in courseList">
    					 	   	 	  <div class="info">
    					 	   	 	  	  <span class="icon-del" @click="deleteCourse(item.course_id)" ></span>
    					 	   	 	  	 <div class="i-info">
		    					 	   	 	  	 <div class="name"><p class="line1">{{item.course_name}}</p><span class="icon-edit" @click="modifyCourseName(item,item.course_id)"></span></div>
		    					 	   	 	  	 <div :class="{'no-class':!item.classes_list.length}"><p class="perNumber"><span>人数：{{item.numbers?item.numbers:0}}人</span></p></div>
		    					 	   	 	  	 <div class="cour-class-box">
				    					 	   	 	  	 <p class="cour-class" v-if="item.classes_list.length">
				    					 	   	 	  	 	{{item.classes_list[0].department}}{{item.classes_list[0].major}}
				    					 	   	 	  	 </p>
				    					 	   	 	  	 <p class="cour-class" v-if="item.classes_list.length">
				    					 	   	 	  	 	{{item.classes_list[0].grade_name}}
				    					 	   	 	  	 </p>
		    					 	   	 	  	 </div>
		    					 	   	 	  	 <div class="chose-box">
		    					 	   	 	  	   <button class="chose-class" @click="showClass(item.course_id)">{{item.classes_list.length?item.classes_list[0].class_name:'请选择班级'}}</button>
		    					 	   	 	  	 </div>
		    					 	   	 	  	 
		    					 	   	 	  	<!-- <el-select class="cour-select" v-model="item.class" clearable placeholder="请选择班级"  @change="changeClass($event,item.course_id)">
														    <el-option
														      v-for="item in teaClassList"
														      :key="item.class_id"
														      :label="item.class_name"
														      :value="item.class_id">
														    </el-option>
														  </el-select>
														  -->
		    					 	   	 	  	 <!--
		    					 	   	 	  	 <span class="btn" v-if="item.type==2" @click="groupVisible=true">分组</span>
		    					 	   	 	  	 -->
    					 	   	 	  	 </div>

    					 	   	 	  </div>
    					 	   	 </li>
    					 	   </ul>
    					 	   <div class="page-block course-page">
    					 	   	<span class="btnAdd" @click="dialogVisible=true;newClassName='';errorMess=''">创建课程</span>
								    <el-pagination
								      @current-change="handleCurrentChange"
								      :current-page.sync="currentPage"
								      :page-size="per_page"
								      layout="prev, pager, next, jumper"
								      :total="totalCourse">
								    </el-pagination>
								  </div>
    					 </div>
    				   <!--课程列表结束-->
    				</div>
    				<p class="addnotice line1"><span>请勾选左侧列表内的课程，再点击“创建课程”，使之成为一门新的课程。</span></p>
    			</div>
    		</div>
    	</div>

    	<!--创建课程弹出框-->
    	<el-dialog class="course-dialog"
		  title="创建课程"
		  :visible.sync="dialogVisible"
		  width="460px">
		  <div class="inName"><input placeholder="请输入课程名称" v-model="newClassName" maxlength="12"/></div>
		  <p class="errorMess" v-if="errorMess!=''">请输入课程名称</p>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sureNewClass">确 定</el-button>
		  </span>
    </el-dialog>

    <!--修改课程名称弹出框-->
    <el-dialog class="course-dialog"
               title="修改课程名称"
               :visible.sync="updatedialogVisible"
               width="460px">
      <div class="inName"><input placeholder="请输入课程名称" v-model="updateClassName"/></div>
      <p class="errorMess" v-if="errorMess!=''">请输入课程名称</p>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="updatedialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sureUpdateCourseName()">确 定</el-button>
		  </span>
    </el-dialog>

    <!--分组点击弹出框-->
    <el-dialog class="group-dialog"
    	:visible.sync="groupVisible"
    	width='460px'
    	 >
       <div class="group-dialog-title clearfix" slot="title">
       	  <h3>绑定班级</h3>
       </div>
       <div class="teaclass n-select-class fist-select-class">
       	  <el-select v-model="department" clearable placeholder="请选择院系" @change="selectDepartment">
				    <el-option
				      v-for="(item,index) in departmentList"
				      :key="index"
				      :label="item"
				      :value="item">
				    </el-option>
				  </el-select>
			  </div>
			  <div class="teaclass n-select-class" v-if="department!=''">
       	  <el-select v-model="major" clearable placeholder="请选择专业" @change="selectMajor">
				    <el-option
				      v-for="(item,index) in majorList"
				      :key="index"
				      :label="item.major_name"
				      :value="item.major_name">
				    </el-option>
				  </el-select>
			  </div>
			  <div class="teaclass n-select-class" v-if="major!=''">
       	  <el-select v-model="grade_name" clearable placeholder="请选择年级" @change="selectGrade">
				    <el-option
				      v-for="(item,index) in grade_nameList"
				      :key="index"
				      :label="item.grade_name"
				      :value="item.grade_name">
				    </el-option>
				  </el-select>
			  </div>
			  
			  <div class="teaclass n-select-class" v-if="grade_name!=''">
       	  <el-select v-model="class_name" clearable placeholder="请选择班级" @change="selectClass">
				    <el-option
				      v-for="(item,index) in classList"
				      :key="index"
				      :label="item.class_name"
				      :value="item.class_id">
				    </el-option>
				  </el-select>
			  </div>
			  
       <div slot="footer">
       	  <span class="surebtn" @click="sureBindClass">确认</span>
       </div>
    </el-dialog>

	</div>
</template>

<script src = "../../common/course.js"></script>
<style scoped lang="less">
@import url("../../assets/css/course.less");
</style>
