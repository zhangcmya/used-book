import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/bms',
    component: Layout,
    redirect: '/bms/book',
    name: 'bms',
    meta: { title: '商品', icon: 'book' },
    children: [{
      path: 'book',
      name: 'book',
      component: () => import('@/views/bms/book/index'),
      meta: { title: '官方商品', icon: 'book-list' }
    },
    {
      path: 'used',
      name: 'used',
      component: () => import('@/views/bms/used/index'),
      meta: { title: '二手商品', icon: 'used-list' }
    },
    {
      path: 'carousel',
      name: 'carousel',
      component: () => import('@/views/bms/carousel/index'),
      meta: { title: '资源列表', icon: 'carousel-list' }
    }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: { title: '订单', icon: 'order' },
    children: [{
      path: 'order',
      name: 'order',
      component: () => import('@/views/oms/order/index'),
      meta: { title: '订单列表', icon: 'order-list' }
    }
    ]
  },
  {
    path: '/fms',
    component: Layout,
    redirect: '/fms/forum',
    name: 'fms',
    meta: { title: '论坛', icon: 'forum' },
    children: [{
      path: 'forum',
      name: 'forum',
      component: () => import('@/views/fms/forum/index'),
      meta: { title: '论坛', icon: 'forum-list' }
    },
    {
      path: 'post',
      name: 'post',
      component: () => import('@/views/fms/post/index'),
      meta: { title: '求购帖', icon: 'post-list' }
    }
    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: { title: '用户', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: { title: '用户列表', icon: 'ums-admin' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
