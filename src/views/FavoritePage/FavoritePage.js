import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Avatar } from 'antd';
import { HeartTwoTone, getTwoToneColor, setTwoToneColor } from '@ant-design/icons';
import Axios from 'axios';

const BASE_IMAGE_URL = "https://recipepadblob.blob.core.windows.net/images/"

function FavoritePage() {
  const [Bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    Axios.get(`/bookmark/${window.localStorage.userId}`).then((response) => {
      if (response.data.success) {
        var rids_str = response.data.rids.join(";");
        Axios.get(`/recipes/${rids_str}`).then((response) => {
          setBookmarks(response.data.recipes);
        });
      } else {
        alert('Failed to get bookmarks');
      }
    });
  }, []);

  const removeItem = (rid) => {
    Axios.delete(`/bookmark/${rid}/${window.localStorage.userId}`).then(
      (response) => {
        if (response.data.success) {
          alert('recipe unbookmark');
        } else {
          alert('recipe unbookmark failed');
        }
      }
    );
  };


  return (
      <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Favorite</h1>
        <div>
        <table>
          <thead>
            <tr>
              <th>Recipe Image</th>
              <th>Recipe Title</th>
              <th>Unbookmark</th>
            </tr>
          </thead>
          <tbody>
            {Bookmarks.map((p) => (
              <tr key={p.title}>
                <td>
                <a href={`/recipe/${p.rid}`}>
                  <img
                    style={{ width: '70px' }}
                    alt='recipe'
                    src={BASE_IMAGE_URL + p.cover_imgid}
                  />
                </a>
                </td>
                <td>{p.title}</td>
                <td>
                <Button
                    type='danger'
                    onClick={() => {
                      removeItem(p.rid);
                    }}
                  >
                  <HeartTwoTone twoToneColor="#eb2f96" />
                </Button>
              </td>
              </tr>
            ))}
          </tbody>
      </table>
        </div>
    </div>
    )
  }

export default FavoritePage