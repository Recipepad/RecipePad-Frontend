import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Avatar } from 'antd';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

import { useDispatch } from 'react-redux';
import { fetchProfile, updateProfile } from '../../actions/user_actions';

const { TextArea } = Input;

function ProfilePage() {
  const dispatch = useDispatch();
  const [emailValue, setemailValue] = useState('');
  const [usernameValue, setusernameValue] = useState('');
  const [nicknameValue, setnicknameValue] = useState('');
  const [Posts, setPosts] = useState([]);
  const [image, setimageValue] = useState('');

  useEffect(() => {
    Axios.get('getPost').then((response) => {
      if (response.data.success) {
        setPosts(response.data.post);
      } else {
        alert('Failed to get post history');
      }
    });
  }, []);

  useEffect(() => {
    dispatch(fetchProfile()).then((response) => {
      setusernameValue(response.payload.username);
      setemailValue(response.payload.email);
      setnicknameValue(response.payload.nickname);
      setimageValue(response.payload.image);
    });
  }, []);

  const onemailChange = (event) => {
    setemailValue(event.currentTarget.value);
  };
  const onnicknameChange = (event) => {
    setnicknameValue(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (!emailValue) {
      return alert('email is required');
    }
    let dataToSubmit = {
      email: emailValue,
    };
    dispatch(updateProfile(dataToSubmit)).then((response) => {
      alert('profile successfully updated');
    });
  };

  const renderImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `/uploads/${image}`;
    }
  };

  const removeItem = (rid) => {
    Axios.delete(`/recipe/<int:rid=${rid}>`).then(
      (response) => {
        if (response.data.success) {
          alert(response.data.message);
        } else {
          alert('delete post failed');
        }
      }
    );
  };

  return (
    <div style={{ width: '80%', margin: '3rem auto ' }}>
      <div style={{ textAlign: 'left' }}>
        <h1>
          <Avatar src={image} alt='image' />
          My Profile{' '}
          <Link className='btn btn-light' to='/settings'>
            <ProfileOutlined type='setting' style={{ color: 'grey' }} />
          </Link>
        </h1>
      </div>
      <br />
      <Form onSubmit={onSubmit}>
        <label>User Name</label>
        <Input  value={usernameValue} disabled/>
        <br />
        <br />
        <label>Email</label>
        <Input onChange={onemailChange} value={emailValue} />
        <br />
        <br />
        <label>Nick Name</label>
        <Input onChange={onnicknameChange} value={nicknameValue} />
        <br />
        <br />
        <Button type='dashed' size='large' onClick={onSubmit}>
          Update Profile
        </Button>
      </Form>
      <br />
      <br />

      <div style={{ textAlign: 'left' }}>
        <h1>
          My Post History <ScheduleOutlined type='schedule' />
        </h1>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Recipe Image</th>
            <th>Recipe Title</th>
            <th>Edit Post</th>
            <th>Delete Post</th>
          </tr>
        </thead>
        <tbody>
          {Posts.map((p) => (
            <tr key={p.title}>
              <td>
                <img
                  style={{ width: '70px' }}
                  alt='recipe'
                  src={renderImage(p.images)}
                />
              </td>
              <td>{p.title}</td>
              <td>{p.author}</td>
              <td>
                <a href={`/recipe/edit/${p.id}`}>
                  <Button type='dashed'>
                    <EditOutlined type='edit' />
                  </Button>
                </a>
              </td>
              <td>
                <Button
                  type='danger'
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this post?'
                      )
                    )
                      removeItem(p.id);
                  }}
                >
                  <DeleteOutlined type='delete' />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfilePage;
