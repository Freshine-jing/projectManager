<template>
  <div class="project-wrapper">

    <!-- 添加新项目 -->
    <div class="content" @click="addProject">
      <div class="center_div hover_text">
        <p>
          <i class="el-icon-plus" style="font-size: 24px"></i>
        </p>
        <p>新建项目</p>
      </div>
    </div>

    <!-- 已存在项目 -->
    <div
      class="content project_img"
      :key="project.id"
      v-for="(project, index) in this.$store.state.projectData"
      @mouseover="display($event)"
      @mouseout="hidden($event)"
    >
      <div class="card_div_hidden">
        <div class="center_div inline-text">
          {{ project.name }}
        </div>
        <el-dropdown class="fr1" size="small" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-button icon="el-icon-more" circle></el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{ type: 1, project }">查看信息</el-dropdown-item>
            <el-dropdown-item :command="{ type: 2, project }">编辑权限</el-dropdown-item>
            <el-dropdown-item :command="{ type: 3, project }">项目导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          class="fr2"
          icon="el-icon-delete"
          circle
          @click="deleteProject(index)"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      
    };
  },
  components: { },

  methods: {
    //添加项目
    addProject(value) {
      this.$prompt("请输入项目名称", "新建项目",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$store.state.projectData.push({name: value,})
        })
        .catch((rej) => {
          // alert('添加失败')
        });
    },

    //删除项目
    deleteProject(id) {
      this.$confirm("确定删除该项目吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.state.projectData.splice(id, 1);
        })
        .catch((rej) => {
          // alert('删除失败')
        });
    },
    
    handleCommand: function (command) {
      if (command.type == 1) {
        this.$router.push({path: "/project_information",})
      }
      else if(command.type == 2){
        this.$router.push({path: "/project_authorization",});
      }
      else{
        this.$router.push({path: "/project_export",});
      }
    },

    display($event) {
      $event.currentTarget.firstChild.className = "card_div";
    },
    hidden($event) {
      $event.currentTarget.firstChild.className = "card_div_hidden";
    },
  },

  computed: {
    
  },
};
</script>

<style scoped>

.project-wrapper {
  position: relative;
  width: 90%;
  height: 100%;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
}
.project_img {
  background-image: url("../../assets/img/project_img.png");
}
.content {
  position: relative;
  float: left;
  /* display: inline-block; */
  height: 150px;
  width: 230px;
  margin: 15px 30px 15px 0;
  background-color: rgb(255, 255, 255);
  font-size: 16px;
}
.fr1 {
  position: absolute;
  top: 5px;
  right: 5px;
}
.fr2 {
  position: absolute;
  top: 5px;
  right: 40px;
}
.card_div {
  height: 100%;
  color: white;
  background-color: rgba(50, 50, 100, 0.2);
}
.card_div_hidden {
  display: none;
}
.center_div {
  position: absolute;
  width: 100%;
  height: 50px;
  top: 50%;
  margin-top: -20px;
}
.el-button {
  font-size: 12px;
}
.el-button.is-circle {
  padding: 8px;
  margin-top: 5px;
  margin-right: 5px;
}
</style>