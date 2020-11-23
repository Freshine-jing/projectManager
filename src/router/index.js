import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

import Project from '../components/project_cpns/project.vue'
// import ProjectAuthorization from '../components/project_cpns/project_authorization.vue'

import Dataset from '../components/dataset_cpns/dataset.vue'
import Module from '../components/module_cpns/module.vue'

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: 'Home'
  },
  {
    path: '/home',
    name: 'Home',
    compoent: Home
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/project_authorization',
    name: 'ProjectAuthorization',
    // component: ProjectAuthorization,
  },
  {
    path: '/dataset',
    name: 'Dataset',
    component: Dataset,
  },
  {
    path: '/module',
    name: 'Module',
    component: Module,
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

export default router
