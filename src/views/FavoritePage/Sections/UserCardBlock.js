import React from 'react';
import { Button } from 'antd';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

function UserCardBlock(props) {
  const renderFavoriteImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `${image}`;
    }
  };

  const renderItems = () =>
    props.recipes &&
    props.recipes.map((recipe) => (
      <tr key={recipe._id}>
        <td>
          <img
            style={{ width: '70px' }}
            alt='recipe'
            src={renderFavoriteImage(recipe.images)}
          />
        </td>
        <td>{recipe.title} </td>
        <td>{recipe.author} </td>
        <td>
          <Button type='danger' onClick={() => props.removeItem(recipe._id)}>
            <DeleteOutlined type='delete' />{' '}
          </Button>{' '}
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Recipe Image</th>
            <th>Recipe Title</th>
            <th>Recipe Author</th>
            <th>Remove from Favorite</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
