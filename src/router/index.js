import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

import Project from '../components/project_cpns/project.vue'
import ProjectAuthorization from '../components/project_cpns/projectAuthorization.vue'
import ProjectExport from '../components/project_cpns/ProjectExport.vue'
import ProjectInformation from '../components/project_cpns/projectInformation.vue'

import Dataset from '../components/dataset_cpns/dataset.vue'

import Module from '../components/module_cpns/module.vue'

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: 'project'
  },

  {
    path: '/project',
    name: 'Project',
    component: Project,
    children: [
      
    ]
  },
  {
    path: '/project_authorization',
    name: 'ProjectAuthorization',
    component: ProjectAuthorization,
  },
  {
    path: '/project_information',
    name: 'ProjectInformation',
    component: ProjectInformation,
  },
  {
    path: '/project_export',
    name: 'ProjectExport',
    component: ProjectExport,
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
  },
  
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // linkActiveClass: 'active'
})

export default router
