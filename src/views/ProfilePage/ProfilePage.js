import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Avatar } from 'antd';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';

const { TextArea } = Input;
const sex = [
  { key: '', value: "I don't want to provide" },
  { key: 'male', value: 'Male' },
  { key: 'female', value: 'Female' },
];

function ProfilePage() {
  return (
    <div style={{ width: '80%', margin: '3rem auto ' }}>
      <div style={{ textAlign: 'left' }}>
        <h1>
          <Avatar />
          My Profile{' '}
          <Link className='btn btn-light' to='/settings'>
            <ProfileOutlined type='setting' style={{ color: 'grey' }} />
          </Link>
        </h1>
      </div>
      <br />
      <Form >
        <label>Email</label>
        <Input  disabled />
        <br />
        <br />
        <label>Full Name</label>
        <Input  />
        <br />
        <br />
        <label>Birthday</label>
        <Input type='date' />
        <br />
        <br />
        <label>Sex</label>
        <br />
        <select
          style={{ width: 200, height: 30, borderRadius: 5 }}
        >
          {sex.map((item) => (
            <option >
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>Phone</label>
        <Input />
        <br />
        <br />
        <label>Address</label>
        <Input />
        <br />
        <br />
        <label>Description</label>
        <TextArea  />
        <br />
        <br />
        <Button type='dashed' size='large'>
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
            <th>Date of Post</th>
            <th>Edit Post</th>
            <th>Delete Post</th>
          </tr>
        </thead>
        <tbody>
            {/* to-do */}
        </tbody>
      </table>
    </div>
  );
}

export default ProfilePage;
