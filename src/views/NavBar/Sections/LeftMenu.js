import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
  <Menu mode={props.mode}>
    <Menu.Item key="books">
      <a href="/recipe" style={{fontSize:20}}>Recipes</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu
