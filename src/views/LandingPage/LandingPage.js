import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Col, Card, Row, Button } from 'antd';
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import ImageSlider from '../../components/ImageSlider';
import SearchFeature from './Sections/SearchFeature';
import { render } from 'react-dom';

const { Meta } = Card;
const BASE_IMAGE_URL = "https://recipepadblob.blob.core.windows.net/images/"

function LandingPage() {
  const [Recipes, updateRecipes] = useState([]);
  const [Skip, setSkip] = useState(0);
  const Limit = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState('');
  const defaultSearchTerm = "food";

  useEffect(() => {
    var controlVariables = {
      limit: Limit,
      loadMore: false,
    };
    getRecipesBySearchTerm(defaultSearchTerm, controlVariables);
  }, []);

  const getRecipesBySearchTerm = (searchTerm, controlVariables) => {
    console.log(Recipes);
    Axios.get(`/search/${searchTerm}`).then((response) => {
      console.log(response.data)
      var rids_str = response.data.rids.join(";");
      if (rids_str === "") {
        updateRecipes([])
      } 
      else {
        Axios.get(`/recipes/${rids_str}`).then((response) => {
          if (response.data.success) {
            if (controlVariables.loadMore) {
              updateRecipes([...Recipes, ...response.data.recipes]);
            } else {
              updateRecipes(response.data.recipes);
            }
            setPostSize(controlVariables.limit);
          } else {
            alert('Failed to fectch recipes data');
          }
        });
      }
    });
  };

  const getRecipes = (variables) => {
    getRecipesBySearchTerm(variables.searchTerm, variables)
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
              <img
                width={200}
                src={BASE_IMAGE_URL + recipe.cover_imgid}
              />
              {/* <ImageSlider images={recipe.images} /> */}
            </a>
          }
        >
          <Meta title={recipe.title} description={`$${recipe.description}`} />
        </Card>
      </Col>
    );
  });

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

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

        <br />

        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
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
