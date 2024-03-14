import  { lazy } from 'react';
import lazyLoad from './lazyload.tsx'
import Layout from '../views/layout'

import { useRoutes, Navigate } from 'react-router-dom'

export const routerItem: Array<object> = [
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    path: '/login',
    label: '登录',
    element: lazyLoad(lazy(() => import('@/views/login'))),
    meta: {
      notRequired: true, //代表不设置登录权限
      title: '登录',
      key: 'login',
    },
  },
  {
    path: '/layout',
    label: '控制台',
    element: <Layout />,
    meta: {
      notRequired: true,
      title: '控制台',
      key: 'login',
    },
    children: [
      {
        path: 'home',
        label: '首页',
        meta: {
          notRequired: true, //代表不设置登录权限
          title: '首页',
          key: 'home',
        },
        element: lazyLoad(lazy(() => import('@/views/home'))),
      },
      {
        path: 'poll&vote',
        label: 'pv',
        meta: {
          notRequired: true, //代表不设置登录权限
          title: 'pv',
          key: 'pv',
        },
        children:[
          {
            path: 'votes',
            label: 'votes',
            meta: {
              notRequired: true, //代表不设置登录权限
              title: 'votes',
              key: 'votes',
            },
            element: lazyLoad(lazy(() => import('@/views/hips/poll&vote/votes'))),
          },
          {
            path: 'new_vote',
            label: 'new_vote',
            meta: {
              notRequired: true, //代表不设置登录权限
              title: 'new_vote',
              key: 'new_vote',
            },
            element: lazyLoad(lazy(() => import('@/views/hips/poll&vote/new_vote'))),
          },
          {
            path: 'details/:id',
            label: 'details',
            meta: {
              notRequired: true, //代表不设置登录权限
              title: 'details',
              key: 'details',
            },
            element: lazyLoad(lazy(() => import('@/views/hips/poll&vote/details'))),
          }
        ]
      },








    ]
  },
]
const GetRouters = () => {
  const routes = useRoutes(routerItem)
  return routes
}
export default GetRouters