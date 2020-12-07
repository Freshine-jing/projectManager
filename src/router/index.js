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
      
    ],
    meta: {
      title: 'Projectpage'
    }
  },
  {
    path: '/project_authorization',
    name: 'ProjectAuthorization',
    component: ProjectAuthorization,
    meta: {
      title: 'ProjectAuthorization'
    }
  },
  {
    path: '/project_information',
    name: 'ProjectInformation',
    component: ProjectInformation,
    meta: {
      title: 'ProjectInformation'
    }
  },
  {
    path: '/project_export',
    name: 'ProjectExport',
    component: ProjectExport,
    meta: {
      title: 'ProjectExport'
    }
  },

  {
    path: '/dataset',
    name: 'Dataset',
    component: Dataset,
    meta: {
      title: 'Dataset'
    }
  },

  {
    path: '/module',
    name: 'Module',
    component: Module,
    meta: {
      title: 'Module'
    }
  },
  
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})

export default router
