// @ts-nocheck
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLogoutUser } from 'utils/auth'

const NavBar = () => {
  const { Item, SubMenu } = Menu
  const [current, setCurrent] = useState('home')
  const menuIconSize = '20px'
  const dispatch = useDispatch()
  const history = useHistory()

  const { USER_STATE } = useSelector(state => ({ ...state }))

  const handleClick = e => {
    setCurrent(e.key)
  }

  const logoutUser = () => {
    firebase.auth().signOut()
    dispatchLogoutUser(dispatch)
    history.push('/login')
  }

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined style={{ fontSize: menuIconSize }} />}>
          <Link to="/">Home</Link>
        </Item>
        {USER_STATE && (
          <SubMenu
            icon={<SettingOutlined />}
            title="userName" // {user.email && user.email.split('@')[0]}
            key="setting"
          >
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item
              key="logout"
              icon={<LogoutOutlined style={{ fontSize: menuIconSize }} />}
              onClick={logoutUser}
            >
              Logout
            </Item>
          </SubMenu>
        )}
        {!USER_STATE && (
          <>
            <Item key="login" icon={<UserOutlined style={{ fontSize: menuIconSize }} />}>
              <Link to="/login">Login</Link>
            </Item>
            <Item key="register" icon={<UserAddOutlined style={{ fontSize: menuIconSize }} />}>
              <Link to="/register">Register</Link>
            </Item>
          </>
        )}
      </Menu>
    </>
  )
}

export default NavBar
