import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { Popover, Button, Descriptions, Image, Layout, Divider, Row, Col, List, Typography  } from 'antd';
import MailOutlined from '@ant-design/icons/MailOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import LaptopOutlined from '@ant-design/icons/LaptopOutlined';
import { HeartTwoTone, getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

import { useSelector } from 'react-redux';

const BASE_IMAGE_URL = "https://recipepadblob.blob.core.windows.net/images/"


function RecipeInfo(props) {
  const user = useSelector((state) => state.user);
  const ingredients = [];

  for (var i in props.Recipe.ingredients) {
    ingredients.push([i, props.Recipe.ingredients[i]]);
  }

  useEffect(() => {
    console.log(props.recipe)
  }, []);

  const addToBookmarkhandler = () => {
    if (user.userData && !user.userData.isAuth) {
      alert('Please Log in first');
      return props.parent.history.push('/login');
    }
    props.addToBookmark(props.Recipe.rid);
    console.log(object)
    alert('Recipe Bookmarked');
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
        <HomeOutlined /> {props.Recipe.username}
      </p>
      <label>
        <strong>Email:</strong>
      </label>
      <p>
        <MailOutlined /> {props.Recipe.useremail}
      </p>
      <label>
        <strong>Nickname:</strong>
      </label>
      <p>
        <LaptopOutlined /> {props.Recipe.usernickname}
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
          <HeartTwoTone twoToneColor="#eb2f96" />
        </Button>
      </div>
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <img
          width={400}
          src={BASE_IMAGE_URL + props.Recipe.cover_imgid}
        />
      </Col>
      <Col span={8}></Col>
    </Row>
    <Row>
    <Col span={8}></Col>
    <Col span={8}>
      <h1> {props.Recipe.title}
      </h1>
    </Col>
    <Col span={8}></Col>
  </Row>
  <Row>
    <Col span={4}></Col>
    <Col span={16}>
      <List
        header="Ingredients"
        bordered
        dataSource={ingredients}
        renderItem={item => (
          <List.Item>
            {item[0] + " " + item[1]}
          </List.Item>
        )}
      />
    </Col>
    <Col span={4}></Col>
  </Row>
  <Row>
    <Col span={4}></Col>
    <Col span={16}>
      <List
        size="large"
        header="Steps"
        bordered
        dataSource={props.Recipe.steps}
        renderItem={item => (
          <List.Item>
            <h1>
            {item.title}
            </h1>
            <br></br>
            <img
              width={272}
              src={BASE_IMAGE_URL + item.image_id}
            />
            <br></br>
          {item.detail}
          </List.Item>
        )}
      />
    </Col>
    <Col span={4}></Col>
  </Row>

  </div>
  );
}
export default RecipeInfo;
