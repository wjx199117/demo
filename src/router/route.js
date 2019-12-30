import Layout from '@/pages/layout/layout';

// 不作为main组件子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/pages/login/login')
};

// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('@/pages/error/index')
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '',
    name: 'home',
    redirect: '/home',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/pages/charts/bar')
      }
    ]
  },
  {
    path: '/charts',
    name: 'charts',
    title: 'echarts图表',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'bar',
        name: 'bar',
        meta: {
          title: '首页',
        },
        component: () => import('@/pages/charts/bar')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    title: '答题模式',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'system_index',
        meta: {
          title: '答题模式',
        },
        component: () => import('@/pages/system/index/index')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    title: '测试',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'test_index',
        meta: {
          title: '测试',
        },
        component: () => import('@/pages/test/test')
      }
    ]
  }
];

export const routers = [
  loginRouter,
  errorRouter,
  ...appRouter
];
