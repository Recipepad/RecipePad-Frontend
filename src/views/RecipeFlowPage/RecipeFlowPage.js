import React, { useEffect, useState } from 'react';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import Axios from 'axios';

function RecipeFlowPage(props) {
    const [Recipes, updateRecipes] = useState([]);

    useEffect(() => {
        Axios.get(`/feed/${window.localStorage.userId}`).then(
            (response) => {
                
            }
        );

    }, []);


    return (
        <div style={{ textAlign: 'center' }}>
            <h2>
                {' '}
                New Recipes From Your Friends <TeamOutlined type='team' />{' '}
            </h2>
        </div>
    )
}

export default RecipeFlowPage;