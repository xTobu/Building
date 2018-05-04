import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首頁', icon: 'dashboard' }
      }
    ]
  },
  // {
  //   path: '/data',
  //   redirect: '/data/index',
  //   component: Layout,
  //   name: 'data',
  //   meta: { title: '資料', icon: 'example' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'index',
  //       component: () => import('@/views/data/index'),
  //       meta: { title: '資料總表', icon: 'table' }
  //     },
  //     {
  //       path: 'notification',
  //       name: 'notification',
  //       component: () => import('@/views/data/notification'),
  //       meta: { title: '活動通知', icon: 'international' }
  //     }
  //   ]
  // },
  {
    path: '',
    component: Layout,
    redirect: '/data',
    name: 'default',
    hidden: true,
    children: [
      {
        path: 'data',
        name: 'data',
        component: () => import('@/views/data/index'),
        meta: { title: '資料總表', icon: 'table' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/data',
    name: 'data',
    hidden: true,
    children: [
      {
        path: 'notification',
        name: 'notification',
        component: () => import('@/views/data/notification'),
        meta: { title: '活動通知', icon: 'international' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/setting',
    name: 'setting',
    children: [
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/setting/index'),
        meta: { title: 'Setting', icon: 'international' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/plan',
    name: 'plan',
    children: [
      {
        path: 'plan',
        name: 'plan',
        component: () => import('@/views/plan/index'),
        meta: { title: 'Plan', icon: 'international' }
      }
    ]
  },
  {
    path: '/calculator',
    redirect: '/calculator/rm',
    component: Layout,
    name: 'calculator',
    meta: { title: '計算機', icon: 'example' },
    children: [
      {
        path: 'rm',
        name: 'rm',
        component: () => import('@/views/calculator/rm'),
        meta: { title: 'Rep Max', icon: 'table' }
      }
      // ,{
      //   path: 'notification',
      //   name: 'notification',
      //   component: () => import('@/views/data/notification'),
      //   meta: { title: '活動通知', icon: 'international' }
      // }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
