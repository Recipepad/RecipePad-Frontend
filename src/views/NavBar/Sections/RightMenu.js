import React from 'react';
import { Menu } from 'antd';

function RightMenu(props) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <a href='/login' style={{ fontSize: 20 }}>
            Signin
          </a>
        </Menu.Item>
        <Menu.Item key='app'>
          <a href='/register' style={{ fontSize: 20 }}>
            Signup
          </a>
        </Menu.Item>
      </Menu>
    )
}

export default RightMenu
