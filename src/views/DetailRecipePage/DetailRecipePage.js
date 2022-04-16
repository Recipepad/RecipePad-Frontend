import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import RecipeImage from './Sections/RecipeImage';
import RecipeInfo from './Sections/RecipeInfo';
import { addToBookmark } from '../../actions/user_actions';
import { useDispatch } from 'react-redux';

function DetailRecipePage(props) {
    const dispatch = useDispatch();
    const recipeId = props.match.params.recipeId
    const [Recipe, setRecipe] = useState([])

    useEffect(() => {
        Axios.get(`/get_recipe?id=${recipeId}`)
            .then(response => {
                setRecipe(response.data[0])
            })
    })

    const addToBookmarkHandler = (recipeId) => {
        dispatch(addToBookmark(recipeId))
    }

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 style={{fontSize:35}}>{Recipe.title}</h1>
            </div>
            <br />
            <div>
                <Row gutter={[16, 16]} >
                    <Col lg={12} xs={24}>
                        <RecipeImage detail={Recipe} />
                    </Col>
                    <Col lg={12} xs={24}>
                        <RecipeInfo
                            addToBookmark={addToBookmarkHandler}
                            detail={Recipe} 
                            parent={props}/>
                    </Col>
                </Row>
            </div>
            <br/>
        </div>
    )
}

export default DetailRecipePage