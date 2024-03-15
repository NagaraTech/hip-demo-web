// 路由权限
import { Navigate, useLocation } from "react-router-dom";
import { matchRoute } from './util'
import { routerItem } from "./index.tsx";
import { useSDK } from "@metamask/sdk-react";
// 查看路由是否有token，否则重定向跳转登录页
function AuthRouter(props: { children: JSX.Element }) {
  const token = localStorage.getItem('accounts')
  const connected = useSDK().connected
  console.log(connected)
  const { pathname } = useLocation()
  const router = matchRoute(pathname, routerItem)
  if (router.meta?.notRequired) { return props.children }
  // 不存在token，返回一个重定向
  if (!token) {
    return <Navigate to="/login" />
  } else {
    return props.children
  }
}
export default AuthRouter