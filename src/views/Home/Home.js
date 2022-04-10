import React from 'react';
import { Button } from 'antd';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import SafetyOutlined from '@ant-design/icons/SafetyOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import PayCircleOutlined from '@ant-design/icons/PayCircleOutlined';
import './Home.css';
import { Row, Col } from 'antd';

function Home() {
  return (
    <div>
      <div id='home-hero'>
        <div className='container'>
          <h1 style={{ color: 'white', fontSize: 50 }}>RecipePad</h1>
          <h1 style={{ color: 'white', fontSize: 30 }}>
            We are here to help you find amazing recipes
            <br />
            We can help make your cooking more interesting
          </h1>
        </div>
      </div>
      <div className='container'>
        <h2 style={{ fontSize: 50, textAlign: 'center', paddingTop: '100px' }}>
          What can you do with RecipePad?
          <br />
        </h2>
        <h2 style={{ fontSize: '1.75rem', textAlign: 'center' }}>
          It's so simple!
        </h2>
        <hr />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className='gutter-row' span={12}>
              <div>
                <SearchOutlined type='search' style={{ fontSize: '4em' }} />
                <h3 style={{ fontSize: '30px' }}>Search recipes</h3>
                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '30px',
                    color: 'grey',
                  }}
                >
                  Use filters to search for any recipes you look for
                </p>
                <hr />
                <br />
              </div>
            </Col>
            <Col className='gutter-row' span={12}>
              <div>
                <ReadOutlined type='read' style={{ fontSize: '4em' }} />
                <h3 style={{ fontSize: '30px' }}>Browse contents</h3>
                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '30px',
                    color: 'grey',
                  }}
                >
                  See all hot recipes' information
                </p>
                <hr />
                <br />
              </div>
            </Col>
            <Col className='gutter-row' span={12}>
              <div>
                <PayCircleOutlined type='dollar' style={{ fontSize: '4em' }} />
                <h3 style={{ fontSize: '30px' }}>Get sponsored</h3>
                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '30px',
                    color: 'grey',
                  }}
                >
                  Get sponsored from your hottest recipe
                </p>
                <hr />
                <br />
              </div>
            </Col>
            <Col className='gutter-row' span={12}>
              <div>
                <SaveOutlined type='save' style={{ fontSize: '4em' }} />
                <h3 style={{ fontSize: '30px' }}>Collect favorites</h3>
                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '30px',
                    color: 'grey',
                  }}
                >
                  Save your interested recipes to your favorite list for future
                </p>
                <hr />
                <br />
              </div>
            </Col>
            <Col className='gutter-row' span={12}>
              <div>
                <SafetyOutlined type='safety' style={{ fontSize: '4em' }} />
                <h3 style={{ fontSize: '30px' }}>Secure information</h3>
                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '30px',
                    color: 'grey',
                  }}
                >
                  Secure information, personal privacy and user authentication
                </p>
                <hr />
                <br />
              </div>
            </Col>
            <Col className='gutter-row' span={12}>
              <div>
                <ShopOutlined type='shop' style={{ fontSize: '4em' }} />
                <h3 style={{ fontSize: '30px' }}>Post and share</h3>
                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '30px',
                    color: 'grey',
                  }}
                >
                  Upload and share your own recipes to help other food lovers
                </p>
                <hr />
                <br />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div id='home-hero1'>
        <div className='container'>
          <h2 className='intro'>
            Stop wasting time
            <br />
            Start sharing recipes
            <br />
            <a href='/home'>
              <Button
                className='start'
                type='default'
                size='large'
                icon='right'
              >
                Let's get started
              </Button>
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
