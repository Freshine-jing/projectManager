<template>
  <div>
    <!--头部-->
    <div class="sub_head">
      <sub-head @invite="invite_dialog_visible = true" :invite_button="true">
        <template slot="right_button">邀请成员</template>
      </sub-head>
    </div>

    <!--权限列表-->
    <div class="content_fixed">
      <div class="content">
        <el-table :data="showProjectAuthorization" style="width: 100%">
          <el-table-column prop="user_name" label="成员" width="180">
          </el-table-column>

          <el-table-column prop="role" label="角色" width="180">
          </el-table-column>

          <el-table-column label="查看" width="180">
            <template slot-scope="scope">
              <div
                class="circle_div"
                style="background-color: green"
                v-if="scope.row.lookFlag == true"
              >
                <i class="el-icon-check" style="color: white"></i>
              </div>
              <div class="circle_div" style="background-color: red" v-else>
                <i class="el-icon-close" style="color: white"></i>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="编辑" width="180">
            <template slot-scope="scope">
              <div
                class="circle_div"
                style="background-color: green"
                v-if="scope.row.editFlag == true"
              >
                <i class="el-icon-check" style="color: white"></i>
              </div>
              <div class="circle_div" style="background-color: red" v-else>
                <i class="el-icon-close" style="color: white"></i>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="删除" width="180">
            <template slot-scope="scope">
              <div
                class="circle_div"
                style="background-color: green"
                v-if="scope.row.deleteFlag == true"
              >
                <i class="el-icon-check" style="color: white"></i>
              </div>
              <div class="circle_div" style="background-color: red" v-else>
                <i class="el-icon-close" style="color: white"></i>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div
                class="change_authorization hover_text"
                @click="changeUserAuthorization(scope.$index)"
              >
                修改成员角色
              </div>
              <div
                class="change_authorization hover_text"
                @click="deleteUser(scope.$index)"
              >
                删除成员
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--邀请成员-->
    <el-dialog title="邀请成员" :visible.sync="invite_dialog_visible">
      <el-form
        :model="invite_users_form"
        ref="ref-invite_users_form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-table :data="invite_users_form.invite_users" style="width: 100%">
          <el-table-column label="成员">
            <template slot-scope="scope">
              <el-form-item
                :prop="'invite_users.' + scope.$index + '.user_id'"
                :rules="{
                  required: true,
                  message: '请选择成员',
                  trigger: 'change',
                }"
                label-width="0"
                style="padding-top: 20px"
              >
                <el-select>
                  <el-option
                    :key="items.id"
                    v-for="items in invitable_users"
                    :label="items.name"
                    :value="items.id"
                    aria-selected="true"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column label="角色">
            <template slot-scope="scope">
              <el-form-item
                :prop="'invite_users.' + scope.$index + '.authorization'"
                :rules="{
                  required: true,
                  message: '请选择角色',
                  trigger: 'change',
                }"
                label-width="0"
                style="padding-top: 20px"
              >
                <el-select v-model="scope.row.authorization">
                  <el-option
                    v-for="item in authorization_map"
                    :key="item.authorization"
                    :label="item.role"
                    :value="item.authorization"
                    aria-selected="true"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                size="small"
                icon="el-icon-minus"
                circle
                @click="deleteInviteUsers(scope.$index)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add_invite_candidate hover_text" @click="addInviteUsers">
          添加
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="invite_dialog_visible = false">取 消</el-button>
        <el-button type="primary" @click="inviteUser">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改成员-->
    <el-dialog
      :title="'修改成员' + change_authorization_params.user_name + '角色'"
      :visible.sync="change_authorization_params.visible"
    >
      <el-select v-model="change_authorization_params.value">
        <el-option
          v-for="item in authorization_map"
          :key="item.authorization"
          :label="item.role"
          :value="item.authorization"
          aria-selected="true"
        >
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="change_authorization_params.visible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="changeUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import subHead from "../../views/subHead.vue";

export default {
  name: "ProjectAuthorizationPage",
  components: {
    subHead,
  },
  data() {
    return {
      authorization_map: [
        {
          authorization: 7,
          role: "管理员",
          lookFlag: true,
          editFlag: true,
          deleteFlag: true,
        },
        {
          authorization: 3,
          role: "协作者",
          lookFlag: true,
          editFlag: true,
          deleteFlag: false,
        },
        {
          authorization: 1,
          role: "游客",
          lookFlag: true,
          editFlag: false,
          deleteFlag: false,
        },
      ],

      invite_dialog_visible: false,

      invite_users_form: {
        invite_users: [
          {
            user_id: "",
            authorization: "",
          },
        ],
      },

      invitable_users: [
        { id: 15, name: "Luffy" },
        { id: 19, name: "Nami" },
        { id: 20, name: "Zoro" },
        { id: 21, name: "Sanji" },
      ],

      change_authorization_params: {
        visible: false,
        index: "",
        user_name: "",
        value: "",
      },
    };
  },

  methods: {
    initInviteUsers() {
      this.invite_users_form.invite_users = [
        {
          user_id: "",
          authorization: "",
        },
      ];
    },
    addInviteUsers() {
      this.invite_users_form.invite_users.push({
        user_id: "",
        authorization: "",
      });
    },
    deleteInviteUsers(index) {
      this.invite_users_form.invite_users.splice(index, 1);
    },

    inviteUser() {
      this.$refs.ref -
        invite_users_form.validate((valid) => {
          if (valid) {
            this.invite_users_form.invite_users.forEach((item) => {
              this.$store.state.currentProjectAuthorization.push(item);
            });
            this.invite_dialog_visible = false;
            this.initInviteUsers();
          }
        });
    },

    changeUserAuthorization(index) {
      this.change_authorization_params.visible = true;
      this.change_authorization_params.index = index;
      this.change_authorization_params.user_name = this.project_authorization[this.change_authorization_params.index].user_name;
    },

    changeUser() {
      this.$store.state.currentProjectAuthorization[this.change_authorization_params.index].authorization=this.change_authorization_params.value
      this.change_authorization_params.visible = false;
      this.change_authorization_params.index = "";
      this.change_authorization_params.user_name = "";
      this.change_authorization_params.value = "";
    },

    deleteUser(index) {
      let user = this.showProjectAuthorization[index];
      this.$confirm("确定删除该成员" + user.user_name + "吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.state.currentProjectAuthorization.splice(index, 1);
        })
        .catch((rej) => {
          console.log(rej);
        });
    },
  },
  computed: {
    showProjectAuthorization() {
      return this.$store.state.currentProjectAuthorization.map((item) => {
        let user_name, role, lookFlag, editFlag, deleteFlag;
        this.$store.state.userData.some((user) => {
          if (user.id == item.user_id) {
            user_name = user.name;
            return true;
          }
        });
        this.authorization_map.some((node) => {
          if (node.authorization == item.authorization) {
            [role, lookFlag, editFlag, deleteFlag] = [
              node.role,
              node.lookFlag,
              node.editFlag,
              node.deleteFlag,
            ];
            return true;
          }
        });
        return {
          root: item,
          user_name,
          role,
          lookFlag,
          editFlag,
          deleteFlag,
        };
      });
    },
  },
};
</script>

<style scoped>
.sub_head {
  position: fixed;
  height: 50px;
  line-height: 50px;
  top: 100px;
  left: 10px;
  right: 10px;
  background-color: white;
  cursor: default;
}

.content_fixed {
  position: fixed;
  top: 160px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background-color: white;
}
.content {
  position: relative;
  margin: 10px;
  padding: 10px;
  height: 100%;
  overflow: auto;
}
.circle_div {
  padding-left: 2px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-block;
}
.add_invite_candidate {
  margin-left: 10px;
  margin-top: 10px;
  cursor: default;
}
.change_authorization {
  cursor: default;
  margin-right: 20px;
  display: inline-block;
}
</style>