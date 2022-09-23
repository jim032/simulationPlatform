<template>
  <div class="pageWrap cour-pageWrap">
    <comheader ref="header" :pageNum="pageNum"></comheader>
    <div class="mainbox">
      <div class="mmain course-main" ref="courseMain">
        <div class="cou-left" :style="{ width: leftNavWidth + 'px' }">
          <div class="coulist" :style="{ width: leftNavWidth + 'px' }">
            <div class="typebox">
              <span
                :class="{ active: newClassType == 1 }"
                @click="chooseType(1)"
                >Single-user</span
              >
              <span
                :class="{ active: newClassType == 2 }"
                @click="chooseType(2)"
                >Multi-user</span
              >
            </div>
            <tree
              :menus="menus"
              :courseIndex="courseIndex"
              @selectItem="selectItem"
              @checkItem="checkItem"
              :actId="actId"
            >
            </tree>
          </div>
        </div>
        <div class="courseMain" :style="{ width: mainWidth + 'px' }">
          <div class="right-main right-main-data">
            <!--当前没有课程列表显示的内容-->
            <div class="content" v-if="courseList.length == 0">
              <div class="form-add">
                <div class="icon" @click="createCourse"></div>
                <p class="mess" @click="createCourse">Creating courses</p>
              </div>
            </div>
            <!--当前有课程-->
            <!--课程列表-->
            <div class="courseList" v-if="courseList.length > 0">
              <ul class="ul-course">
                <li v-for="(item, index) in courseList">
                  <div class="info">
                    <span
                      class="icon-del"
                      @click="deleteCourse(item.course_id)"
                    ></span>
                    <div class="i-info">
                      <div class="name">
                        <p class="line1">{{ item.course_name }}</p>
                        <span
                          class="icon-edit"
                          @click="modifyCourseName(item, item.course_id)"
                        ></span>
                      </div>
                      <div :class="{ 'no-class': !item.classes_list.length }">
                        <p class="perNumber">
                          <span
                            >Number of people{{
                              item.numbers ? item.numbers : 0
                            }}</span
                          >
                        </p>
                      </div>
                      <div class="cour-class-box">
                        <p class="cour-class" v-if="item.classes_list.length">
                          {{ item.classes_list[0].department
                          }}{{ item.classes_list[0].major }}
                        </p>
                        <p class="cour-class" v-if="item.classes_list.length">
                          {{ item.classes_list[0].grade_name }}
                        </p>
                      </div>
                      <div class="chose-box">
                        <button
                          class="chose-class"
                          @click="showClass(item.course_id)"
                        >
                          {{
                            item.classes_list.length
                              ? item.classes_list[0].class_name
                              : "Please choose a class"
                          }}
                        </button>
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
                <span
                  class="btnAdd"
                  @click="
                    dialogVisible = true;
                    newClassName = '';
                    errorMess = '';
                  "
                  >Creating courses</span
                >
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="per_page"
                  layout="prev, pager, next, jumper"
                  :total="totalCourse"
                >
                </el-pagination>
              </div>
            </div>
            <!--课程列表结束-->
          </div>
          <p class="addnotice line1">
            <span
              >Please check the course in the list on the left and click "create
              course" to make it a new course.</span
            >
          </p>
        </div>
      </div>
    </div>

    <!--创建课程弹出框-->
    <el-dialog
      class="course-dialog"
      title="创建课程"
      :visible.sync="dialogVisible"
      width="460px"
    >
      <div class="inName">
        <input
          placeholder="Please enter the course name"
          v-model="newClassName"
          maxlength="12"
        />
      </div>
      <p class="errorMess" v-if="errorMess != ''">
        Please enter the course name
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button type="primary" @click="sureNewClass">confirm</el-button>
      </span>
    </el-dialog>

    <!--修改课程名称弹出框-->
    <el-dialog
      class="course-dialog"
      title="Modify course name"
      :visible.sync="updatedialogVisible"
      width="460px"
    >
      <div class="inName">
        <input placeholder="Please enter the course name" v-model="updateClassName" />
      </div>
      <p class="errorMess" v-if="errorMess != ''">
        Please enter the course name
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatedialogVisible = false">cancel</el-button>
        <el-button type="primary" @click="sureUpdateCourseName()"
          >confirm</el-button
        >
      </span>
    </el-dialog>

    <!--分组点击弹出框-->
    <el-dialog class="group-dialog" :visible.sync="groupVisible" width="460px">
      <div class="group-dialog-title clearfix" slot="title">
        <h3>Bound class</h3>
      </div>
      <div class="teaclass n-select-class fist-select-class">
        <el-select
          v-model="department"
          clearable
          placeholder="Please choose a department"
          @change="selectDepartment"
        >
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="teaclass n-select-class" v-if="department != ''">
        <el-select
          v-model="major"
          clearable
          placeholder="Please choose a major"
          @change="selectMajor"
        >
          <el-option
            v-for="(item, index) in majorList"
            :key="index"
            :label="item.major_name"
            :value="item.major_name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="teaclass n-select-class" v-if="major != ''">
        <el-select
          v-model="grade_name"
          clearable
          placeholder="Please choose a grade"
          @change="selectGrade"
        >
          <el-option
            v-for="(item, index) in grade_nameList"
            :key="index"
            :label="item.grade_name"
            :value="item.grade_name"
          >
          </el-option>
        </el-select>
      </div>

      <div class="teaclass n-select-class" v-if="grade_name != ''">
        <el-select
          v-model="class_name"
          clearable
          placeholder="Please choose a class"
          @change="selectClass"
        >
          <el-option
            v-for="(item, index) in classList"
            :key="index"
            :label="item.class_name"
            :value="item.class_id"
          >
          </el-option>
        </el-select>
      </div>

      <div slot="footer">
        <span class="surebtn" @click="sureBindClass">confirm</span>
      </div>
    </el-dialog>
  </div>
</template>

<script src="../../common/course.js"></script>
<style scoped lang="less">
@import url("../../assets/css/course.less");
</style>
