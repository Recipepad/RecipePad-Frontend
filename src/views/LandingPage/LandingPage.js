import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Col, Card, Row, Button } from 'antd';
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import ImageSlider from '../../components/ImageSlider';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;

function LandingPage() {
  const [Recipes, setRecipes] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState('');

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getRecipes(variables);
  }, []);

  const getRecipes = (variables) => {
    // console.log(variables)
    Axios.post('/getRecipes', variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setRecipes([...Recipes, ...response.data.recipes]);
        } else {
          setRecipes(response.data.recipes);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('Failed to fectch recipes data');
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getRecipes(variables);
    setSkip(skip);
  };

  const renderCards = Recipes.map((recipe, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/recipe/${recipe.rid}`}>
              {' '}
              <ImageSlider images={recipe.images} />
            </a>
          }
        >
          <Meta title={recipe.title} description={`$${recipe.description}`} />
        </Card>
      </Col>
    );
  });

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerms(newSearchTerm);
    getRecipes(variables);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          {' '}
          Let's Search Recipes <RocketOutlined type='rocket' />{' '}
        </h2>
      </div>

      <div>
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div>
      {Recipes.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />

      {PostSize >= Limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='dashed' size='large' onClick={onLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
