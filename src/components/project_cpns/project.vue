<template>
  <div class="project-wrapper clearfix">
    <div class="son_div" @click="addProject">
      <div class="center_div hover_text">
        <p>
          <i class="el-icon-plus" style="font-size: 24px"></i>
        </p>
        <p>新建项目</p>
      </div>
    </div>
    <div
      class="son_div project_bg"
      :key="project.id"
      v-for="project in projectData"
      @mouseover="display_card($event)"
      @mouseout="hidden_card($event)"
    >
      <div class="card_div_hidden">
        <div class="center_div inline-text">
          {{ project.name }}
        </div>
        <el-dropdown class="fr" size="small" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-button icon="el-icon-more" circle></el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看信息</el-dropdown-item>
            <el-dropdown-item 
            :command="{ command: 2, project }">
            编辑权限</el-dropdown-item>
            <el-dropdown-item>项目导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          class="fr"
          icon="el-icon-delete"
          circle
          @click="deleteProject(project.id)"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectManagementPage",
  props: ["__user__"],
  data() {
    return {
      user: this.__user__,
      projectData: [
        {
          id: 1,
          name: "项目名称1",
          chosen: false,
        },
        {
          id: 2,
          name: "项目名称2",
          chosen: false,
        },
      ],
    };
  },
  components: {
    //ProjectCard
  },
  methods: {
    queryData: async function () {
      // 调用后台接口获取项目列表数据

      let data = await this.$http.get("project-list");
      this.project_list = data.data;
      //this.card_flag = this.project_list.map((() => true));
      //console.log(this.project_list);
    },
    deleteProject: async function (id) {
      // 删除项目
      this.$confirm("确定删除该项目吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.$http.delete("project-list/" + id.toString());
        })
        .then((ret) => {
          if (ret.status == 200) {
            // 重新加载列表数据
            this.queryData();
          }
        })
        .catch((rej) => {
          console.log(rej);
        });
    },
    addProject: async function () {
      this.$prompt("请输入项目名称", "新建项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "项目名称不能为空",
      })
        .then(({ value }) => {
          return this.$http.post("project-list", {
            name: value,
            user_id: this.user.id,
          });
        })
        .then((ret) => {
          if (ret.status == 200) {
            // 重新加载列表数据
            this.queryData();
          }
        })
        .catch((rej) => {
          console.log(rej);
        });
    },

    handleCommand: function (command) {
      if (command.command == 2) {
        this.gotoProjectAuthorizationPage(command.project);
      }
    },
    gotoProjectAuthorizationPage: function (project) {
      this.$router.push({
        path: "/project-authorization-page/" + project.id.toString(),
        query: { project_name: project.name },
      });
    },

    display_card($event) {
      $event.currentTarget.firstChild.className = "card_div";
      //console.log($event)
      //console.log($event.currentTarget.firstChild)
    },
    hidden_card($event) {
      $event.currentTarget.firstChild.className = "card_div_hidden";
      //console.log($event)
    },
  },
  computed: {
    project_list_len: function () {
      return this.project_list.length;
    },
  },
  mounted() {
    this.queryData();
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
.son_div {
  position: relative;
  float: left;
  /* display: inline-block; */
  height: 150px;
  width: 230px;
  margin: 15px 30px 15px 0;
  background-color: rgb(255, 255, 255);
  font-size: 16px;
}
.clearfix {
  /* display: inline-block; */
  text-align: center;
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