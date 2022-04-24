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
    const [Recipe, setRecipe] = useState('')


    useEffect(() => {
        Axios.get(`/recipe/${recipeId}`)
            .then(response => {
                setRecipe(response.data)
            })
    }, [])

    const addToBookmarkHandler = (recipeId) => {
        dispatch(addToBookmark(recipeId))
    }

    return (
        <RecipeInfo
            Recipe={Recipe}
            addToBookmark={addToBookmarkHandler}
            detail="https://recipepadblob.blob.core.windows.net/images/4-cover-1650738513275.jpg"
            parent={props}/>
        
    )
}

export default DetailRecipePage