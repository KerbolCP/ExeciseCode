<!-- list -->
<template>
  <div class="app-container">
    <el-table :data="studentList" stripe style="width: 100%">
      <el-table-column prop="data.name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="data.age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="data.school" label="学校">
        <template slot-scope="scope">{{showSchool(scope.row.data.school)}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudent } from "@/api/student";
export default {
  data() {
    return {
      studentList: []
    };
  },
  methods: {
    getData() {
      getStudent().then(res => {
        console.log(res);
        this.studentList = res.data.data;
      });
    },
    showSchool(str) {
      console.log(str);

      switch (str) {
        case "hd":
          return "黑龙江大学";
          break;
        case "lg":
          return "哈尔滨理工大学";
          break;
        default:
          return "---";
      }
    },
    handleEdit(index, row) {}
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>