import React, { useEffect, useState } from 'react';
import { Popover, Button, Descriptions } from 'antd';
import MailOutlined from '@ant-design/icons/MailOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import LaptopOutlined from '@ant-design/icons/LaptopOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

import { useSelector } from 'react-redux';

function RecipeInfo(props) {
  const user = useSelector((state) => state.user);
  const [Recipe, setRecipe] = useState({});

  useEffect(() => {
    setRecipe(props.detail);
  }, [props.detail]);

  const addToBookmarkhandler = () => {
    if (user.userData && !user.userData.isAuth) {
      alert('Please Log in first');
      return props.parent.history.push('/login');
    }
    props.addToBookmark(props.detail._id);
  };

  const rendercategory = (choice) => {
    switch (choice) {
      case 1:
        return 'Appetizer';
      case 2:
        return 'Entrée';
      case 3:
        return 'Dessert';
      case 4:
        return 'Drink';
      default:
        return 'Gourmet';
    }
  };

  const content = (
    <div>
    <label>
        <strong>Username:</strong>
      </label>
      <p>
        <HomeOutlined /> {Recipe.username}
      </p>
      <label>
        <strong>Email:</strong>
      </label>
      <p>
        <MailOutlined /> {Recipe.useremail}
      </p>
      <label>
        <strong>Nickname:</strong>
      </label>
      <p>
        <LaptopOutlined /> {Recipe.usernickname}
      </p>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          size='large'
          shape='round'
          type='danger'
          onClick={addToBookmarkhandler}
        >
          <HeartOutlined />
        </Button>
      </div>
      <Descriptions title='Recipe Information:'>
        <Descriptions.Item label='Title'> {Recipe.title}</Descriptions.Item>
        <Descriptions.Item label='Ingredients'>
          {' '}
          {Recipe.ingredients}
        </Descriptions.Item>
        <Descriptions.Item label='Category'>
          {' '}
          {rendercategory(Recipe.tags)}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <div>
        <label style={{ fontSize: 16 }}>
          <strong>Steps and Details:</strong>
        </label>
        <p>{Recipe.steps}</p>
      </div>
      <div>
        <label style={{ fontSize: 16 }}>
          <strong>Author:</strong>
        </label>
        <p>
          <UserOutlined /> {Recipe.username} &nbsp;&nbsp;&nbsp;&nbsp;{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;{' '}
          <Popover content={content} title='Author profile' trigger='click'>
            <a>View Profile</a>
          </Popover>
        </p>
      </div>
    </div>
  );
}
export default RecipeInfo;
