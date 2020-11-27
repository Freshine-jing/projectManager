<template>
  <div>
    <div class="nav_fixed">
      <div class="nav">
        <!-- 创建&导入 -->
        <div>
          <div class="button_div hover_text" @click="createDataset">
            <i class="el-icon-folder-add"></i>
            <span>创建分类</span>
          </div>
          <div class="button_div hover_text" @click="showDatasetImport = true">
            <i class="el-icon-folder-add"></i>
            <span>导入数据</span>
          </div>
        </div>

        <!-- 数据展示 -->
        <el-tree
          class="display_data"
          :data="showDataset"
          node-key="id"
          :expand-on-click-node="true"

        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <el-tooltip
              class="item"
              effect="dark"
              :content="node.label"
              placement="top-end"
              v-show="!(node_rename.id == data.id)"
            >
              <span class="menuitem_div inline-text">
                {{ node.label }}
              </span>
            </el-tooltip>

            <el-input
              v-model="node_rename.newName"
              :placeholder="node.label"
              v-show="(node_rename.id == data.id)"
              @change="renameDataset()"
            ></el-input>
            <span class="dropdown_div">
              <el-dropdown
                class="dropdown_class"
                size="small"
                @command="handleCommandDropdown"
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="{ command: 1, node: node, data: data }"
                    >重命名</el-dropdown-item
                  >
                  <el-dropdown-item
                    :command="{ command: 2, node: node, data: data }"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </el-tree>
      </div>
    </div>

    <div class="content_fixed">
      <div class="sub_head" v-show="showDatasetImport">
        <sub-head @goback="showDatasetImport = false"></sub-head>
        <data-import class="content_main"></data-import>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dataImport from "./dataImport.vue";
import subHead from "./subHead.vue";

export default {
  name: "DatasetManagement",
  components: {
    dataImport,
    subHead,
  },
  data() {
    return {
      dataset_list: [],

      node_rename : {
          type: '',
          id: '',
          newName: '',
      },
      node_del: {
          id:'',
      },


      data_onclick: {},

      showDatasetImport: false,

      len: this.$store.state.dataset.length,
    };
  },
  methods: {

    createDataset() {
        // alert(this.len)
      this.$prompt("创建数据库", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$store.state.dataset.push({ name: value, id: ++this.len });
        })
        .catch((rej) => {
          console.log(rej);
        });
    },

    renameDataset() {
          this.$store.state.dataset.some((item) => {
              if(item.id == this.node_rename.id){
                  item.name = this.node_rename.newName
              }
          })
        
      this.node_rename = {
        type: "",
        id: "",
        newName: "",
      };
    },

    deleteDataset(node) {

        this.$confirm(
          "由于" +
            node.label +
            "已被应用于实际的项目，删除该数据库会影响到以下几个项目中的数据处理管道：project 1。您确定要删除这个数据库吗？",
          "确定删除该数据库吗?",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
          
        ).then(() => {
            this.$store.state.dataset.some((item, idx) => {
                if(item.id == node.id){
                    this.$store.state.dataset.splice(idx, 1)
                }
            })
          })
          .catch((rej) => {
            console.log(rej);
          });
    },

    handleCommandDropdown(command) {
      if (command.command == 1) {
        this.node_rename.id = command.data.id;
        this.node_rename.newName = command.data.label;
      } else {
        this.deleteDataset(command.data);
      }
    },

    handleNodeClick(data) {
      this.data_onclick = data;
    },
  },

  computed: {
    showDataset() {
      return this.$store.state.dataset.map((dataset) => {
        let d_node = {};
        d_node.type = "dataset";
        d_node.id = dataset.id;
        d_node.label = dataset.name;

        d_node.ref = dataset;

        return d_node;
      });
    },
  },
};
</script>

<style scoped>
.nav_fixed {
  position: absolute;
  top: 110px;
  bottom: 0;
  left: 0;
  width: 300px;
  background-color: white;
  cursor: default;
}
.content_fixed {
  position: fixed;
  top: 110px;
  bottom: 20px;
  left: 320px;
  right: 20px;
  background-color: white;
  cursor: default;
}
.sub_head {
  margin: 25px;
}
.content_main {
  top: 20px;
}
.nav,
.content {
  position: relative;
  margin: 0;
  padding: 10px;
  height: 100%;
  overflow: auto;
}
.button_div {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 80px;
  padding-left: 30px;
}
.dropdown_div {
  display: inline-block;
}
.menuitem_div {
  width: 180px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
