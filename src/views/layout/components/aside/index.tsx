import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './index.css'
import {
  FileTextOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, MenuProps } from 'antd';
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem('Home', '/layout/home', <FileTextOutlined />),
  getItem('HIPBs', '/demo', <FileTextOutlined />, [
    getItem('Poll&Vote', '/layout/poll&vote/votes', <FileTextOutlined />),
  ]),
];
function Aside() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { token: { colorBgContainer } } = theme.useToken();
  let title = '';
  const useTitle = localStorage.getItem('title')
  // 子路由跳转
  const menuClick = (e: { key: string }) => {
    if (e.key == '/layout/home') {
      title = 'HomePage'
      localStorage.setItem('title', title)
    }
    else if (e.key == '/layout/poll&vote/votes') {
      title = 'Poll&Vote'
      localStorage.setItem('title', title)
    }
    else if (e.key == '/layout/basic') {
      title = 'react基础Api'
      localStorage.setItem('title', title)
    }
    else if (e.key == '/layout/form') {
      title = 'form表单'
      localStorage.setItem('title', title)
    }
    navigate(e.key)
  }
  const initSelect: string = ''
  // 设置只能有一个展开项
  const [openKeys, setOpenKeys] = useState([initSelect]);
  const rootSubmenuKeys = ['/about', '/demo'];

  const handleOpen = (keys: string[]) => {
    // 这是antd官方的写法
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  // 刷新时被选中的menu二级菜单初始化的展开问题
  useEffect(() => {
    const refreshThePage = () => {
      const rank = pathname.split('/')
      if (rank.length === 3) {
        const newOpenkeys = rank.slice(0, 2).join('/')
        setOpenKeys([newOpenkeys])
      }
    }
    if (useTitle) {
      title = ''
    }
    refreshThePage()
  }, [])
  return (
    <div className='aside-container'>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <div className='title'>HeTu-HIPBs</div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['layout']}
            openKeys={openKeys} mode="inline"
            selectedKeys={[pathname]}
            onOpenChange={handleOpen}
            items={items}
            onClick={menuClick}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}
              items={[
                { title: `HeTu ${title ? '/' : ''} ${title ? title : '/ ' + useTitle}` },
              ]}>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
export default Aside