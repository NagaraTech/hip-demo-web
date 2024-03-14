import { http } from './reqiest'
import { Login } from './types'

// 登录
export function getLogin(data: Login) {
  return http.post('/api/login/', data)
}
// 首页
export function getHomeData() {
  return http.get('http://localhost:2080/List')
} 