import React, { useEffect, useState } from 'react';
import { Col, Card, Row, Button, Avatar } from 'antd';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import Axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import './RecipeFlowPage.css';
const { Meta } = Card;

const BASE_IMAGE_URL = "https://recipepadblob.blob.core.windows.net/images/"

function RecipeFlowPage(props) {
    const [Recipes, updateRecipes] = useState([]);

    useEffect(() => {
        Axios.get(`/feed/${window.localStorage.userId}`).then(
            (response) => {
                const rids = response.data.rids;
                const rids_str = rids.join(";");
                Axios.get(`/recipes/${rids_str}`).then(
                    (response) => {
                        // console.log(response.data.recipes)
                        response.data.recipes.reverse(); // make sure latest recipe shows up first
                        updateRecipes(response.data.recipes)
                    }
                )
            }
        );
    }, []);

    const getRecipeAuthor = (uid) => {
        switch (uid) {
            case 4:
                return "Recipebot";
            case 9:
                return "Yutao";
            case 8:
                return "Yongzhou";
            default:
                return "Unknown";
        }
    }

    const handleConsume = () => {
        alert("Click")
    };

    const renderCards = Recipes.map((recipe, index) => {
        return (
          <Row key={index} lg={8} md={8} xs={8} >
            <Card
              hoverable={true}
              cover={
                <a href={`/recipe/${recipe.rid}`} onClick={handleConsume}>
                <br/>
                <div className="bar">
                    <Avatar icon={<UserOutlined />} /> &nbsp; &nbsp;
                    <h3> Created by: {getRecipeAuthor(recipe.uid)} </h3>
                </div>
                <h4> Created at: Today </h4>
                  <img
                    width={400}
                    height={300}
                    src={BASE_IMAGE_URL + recipe.cover_imgid}
                  />
                </a>
              }
            >
            <Meta title={recipe.title} description={`$${recipe.description.substring(0, 25)}`} />
            </Card>
           </Row>
        );
      });


    return (
        <div style={{ textAlign: 'center' }}>
            <h2>
                {' '}
                New Recipes From Your Friends <TeamOutlined type='team' />{' '}
            </h2>
            <div>
                {renderCards}
            </div>
        </div>
    )
}

export default RecipeFlowPage;